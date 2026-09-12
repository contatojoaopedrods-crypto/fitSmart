package com.fitsmart.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Locale;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fitsmart.dto.CreateDobraCutaneaRequest;
import com.fitsmart.exception.InvalidAvaliacaoFisicaException;
import com.fitsmart.model.enums.TipoDobraCutanea;
import com.fitsmart.dto.ResultadoComposicaoCorporal;

import org.springframework.stereotype.Service;

@Service
public class CalculoComposicaoCorporalService {

    private static final int CASAS_DECIMAIS = 2;
    private static final Set<TipoDobraCutanea> DOBRAS_JACKSON_POLLOCK_7 = EnumSet.of(
            TipoDobraCutanea.PEITORAL,
            TipoDobraCutanea.AXILAR_MEDIA,
            TipoDobraCutanea.TRICIPITAL,
            TipoDobraCutanea.SUBESCAPULAR,
            TipoDobraCutanea.ABDOMINAL,
            TipoDobraCutanea.SUPRAILIACA,
            TipoDobraCutanea.COXA);

    public BigDecimal calcularImc(
            BigDecimal peso,
            BigDecimal altura) {

        BigDecimal alturaAoQuadrado = altura.multiply(altura);

        return peso.divide(
                alturaAoQuadrado,
                CASAS_DECIMAIS,
                RoundingMode.HALF_UP);
    }

    public BigDecimal calcularDensidadeCorporal(
            BigDecimal somaDobras,
            int idade,
            String sexo) {

        BigDecimal somaDobrasAoQuadrado = somaDobras.pow(2);
        BigDecimal idadeDecimal = BigDecimal.valueOf(idade);

        return switch (sexo.trim().toUpperCase(Locale.ROOT)) {

            case "M" -> new BigDecimal("1.112")
                    .subtract(
                            new BigDecimal("0.00043499")
                                    .multiply(somaDobras))
                    .add(
                            new BigDecimal("0.00000055")
                                    .multiply(somaDobrasAoQuadrado))
                    .subtract(
                            new BigDecimal("0.00028826")
                                    .multiply(idadeDecimal));

            case "F" -> new BigDecimal("1.097")
                    .subtract(
                            new BigDecimal("0.00046971")
                                    .multiply(somaDobras))
                    .add(
                            new BigDecimal("0.00000056")
                                    .multiply(somaDobrasAoQuadrado))
                    .subtract(
                            new BigDecimal("0.00012828")
                                    .multiply(idadeDecimal));

            default -> throw new IllegalArgumentException(
                    "Não existe protocolo automático definido para este sexo");
        };
    }

    public BigDecimal calcularPercentualGordura(
            BigDecimal densidadeCorporal) {

        return new BigDecimal("495")
                .divide(
                        densidadeCorporal,
                        10,
                        RoundingMode.HALF_UP)
                .subtract(new BigDecimal("450"))
                .setScale(
                        CASAS_DECIMAIS,
                        RoundingMode.HALF_UP);
    }

    public BigDecimal calcularMassaGorda(
            BigDecimal peso,
            BigDecimal percentualGordura) {

        return peso
                .multiply(percentualGordura)
                .divide(
                        new BigDecimal("100"),
                        CASAS_DECIMAIS,
                        RoundingMode.HALF_UP);
    }

    public BigDecimal calcularMassaMagra(
            BigDecimal peso,
            BigDecimal massaGorda) {

        return peso
                .subtract(massaGorda)
                .setScale(
                        CASAS_DECIMAIS,
                        RoundingMode.HALF_UP);
    }

    public BigDecimal calcularSomaDobrasJacksonPollock7(
            List<CreateDobraCutaneaRequest> dobrasCutaneas) {

        Map<TipoDobraCutanea, BigDecimal> valoresPorTipo = new EnumMap<>(TipoDobraCutanea.class);

        for (CreateDobraCutaneaRequest dobra : dobrasCutaneas) {

            BigDecimal valorAnterior = valoresPorTipo.putIfAbsent(
                    dobra.tipo(),
                    dobra.valorMm());

            if (valorAnterior != null) {
                throw new InvalidAvaliacaoFisicaException(
                        "A dobra " + dobra.tipo() + " foi informada mais de uma vez");
            }
        }

        BigDecimal soma = BigDecimal.ZERO;

        for (TipoDobraCutanea tipoObrigatorio : DOBRAS_JACKSON_POLLOCK_7) {

            BigDecimal valor = valoresPorTipo.get(tipoObrigatorio);

            if (valor == null) {
                throw new InvalidAvaliacaoFisicaException(
                        "A dobra " + tipoObrigatorio + " é obrigatória");
            }

            soma = soma.add(valor);
        }

        return soma;
    }

    public boolean podeAplicarJacksonPollock7(
            int idade,
            String sexo) {

        if (sexo == null) {
            return false;
        }

        return switch (sexo.trim().toUpperCase(Locale.ROOT)) {
            case "M" -> idade >= 18 && idade <= 61;
            case "F" -> idade >= 18 && idade <= 55;
            default -> false;
        };
    }

    public ResultadoComposicaoCorporal calcular(
            BigDecimal peso,
            BigDecimal altura,
            List<CreateDobraCutaneaRequest> dobrasCutaneas,
            int idade,
            String sexo) {

        BigDecimal imc = calcularImc(peso, altura);

        if (!podeAplicarJacksonPollock7(idade, sexo)) {
            return new ResultadoComposicaoCorporal(
                    imc,
                    null,
                    null,
                    null,
                    null);
        }

        BigDecimal somaDobras = calcularSomaDobrasJacksonPollock7(dobrasCutaneas);

        BigDecimal densidadeCorporal = calcularDensidadeCorporal(somaDobras, idade, sexo);

        BigDecimal percentualGordura = calcularPercentualGordura(densidadeCorporal);

        BigDecimal massaGorda = calcularMassaGorda(peso, percentualGordura);

        BigDecimal massaMagra = calcularMassaMagra(peso, massaGorda);

        return new ResultadoComposicaoCorporal(
                imc,
                percentualGordura,
                massaGorda,
                massaMagra,
                "JACKSON_POLLOCK_7");
    }

}