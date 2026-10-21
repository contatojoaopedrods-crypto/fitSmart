package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.model.enums.ClassificacaoRecomendacao;

@Service
public class CalculadoraCompatibilidadeService {

    public static final String VERSAO_ALGORITMO = "1.0.0";

    /*
     * Convenção interna do MVP, sem validação clínica.
     * A pontuação não representa probabilidade de lesão,
     * diagnóstico ou aprovação automática do exercício,
     * mas sim, uma recomendação baseada no riscos oferecidos
     * de acordo com o perfil do aluno.
     */
    private static final int LIMIAR_ALTO_RISCO = 50;

    public ResultadoPontuacao calcular(
            List<DetalhePontuacaoResponse> detalhes,
            boolean bloqueado) {

        validarDetalhes(detalhes);

        List<DetalhePontuacaoResponse> detalhesImutaveis =
                List.copyOf(detalhes);

        /*
         * Um bloqueio explícito prevalece sobre a média.
         * Assim, uma contraindicação definida pelas regras
         * não é diluída por outras penalizações menores.
         */
        if (bloqueado) {
            return new ResultadoPontuacao(
                    0,
                    100,
                    ClassificacaoRecomendacao.NAO_RECOMENDADO,
                    true,
                    detalhesImutaveis
            );
        }

        /*
         * Considera somente penalizações positivas.
         * Detalhes informativos com risco zero não reduzem
         * a média das condições que geraram penalização.
         */
        double mediaPenalizacoes = detalhesImutaveis
                .stream()
                .filter(detalhe -> detalhe.risco() > 0)
                .mapToInt(DetalhePontuacaoResponse::risco)
                .average()
                .orElse(0.0);

        int riscoCalculado =
                (int) Math.round(mediaPenalizacoes);

        int compatibilidade = 100 - riscoCalculado;

        ClassificacaoRecomendacao classificacao =
                classificar(riscoCalculado);

        return new ResultadoPontuacao(
                compatibilidade,
                riscoCalculado,
                classificacao,
                false,
                detalhesImutaveis
        );
    }

    private void validarDetalhes(
            List<DetalhePontuacaoResponse> detalhes) {

        if (detalhes == null) {
            throw new IllegalArgumentException(
                    "A lista de detalhes da pontuação não pode ser nula"
            );
        }

        for (DetalhePontuacaoResponse detalhe : detalhes) {

            if (detalhe == null) {
                throw new IllegalArgumentException(
                        "Um detalhe da pontuação não pode ser nulo"
                );
            }

            if (detalhe.risco() < 0 || detalhe.risco() > 100) {
                throw new IllegalArgumentException(
                        "A penalização deve estar entre 0 e 100"
                );
            }
        }
    }

    private ClassificacaoRecomendacao classificar(
            int riscoCalculado) {

        if (riscoCalculado == 100) {
            return ClassificacaoRecomendacao.NAO_RECOMENDADO;
        }

        if (riscoCalculado >= LIMIAR_ALTO_RISCO) {
            return ClassificacaoRecomendacao.ALTO_RISCO;
        }

        if (riscoCalculado > 0) {
            return ClassificacaoRecomendacao.RECOMENDADO_COM_ATENCAO;
        }

        return ClassificacaoRecomendacao.RECOMENDADO;
    }

    public record ResultadoPontuacao(

            int compatibilidade,

            int riscoCalculado,

            ClassificacaoRecomendacao classificacao,

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}