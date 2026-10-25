package com.fitsmart.service;

import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.AvaliacaoBiomecanicaCompletaResponse;
import com.fitsmart.dto.AvaliacaoBiomecanicaResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.ExercicioResponse.AcaoArticularVinculadaResponse;
import com.fitsmart.model.enums.AmplitudeMovimento;
import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.Estabilidade;
import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Impacto;
import com.fitsmart.model.enums.TipoLimitacao;

@Service
public class RegraBiomecanicaService {

    /*
     * Heurísticas da versão 1.0.0 do MVP.
     *
     * Os pesos e as associações abaixo não possuem
     * validação clínica e não representam diagnóstico.
     *
     * A gravidade refere-se à limitação registrada
     * na avaliação biomecânica, embora o enum existente
     * no projeto se chame GravidadeLesao.
     */

    public ResultadoRegraBiomecanica analisar(
            ExercicioResponse exercicio,
            AvaliacaoBiomecanicaCompletaResponse avaliacao) {

        Objects.requireNonNull(
                exercicio,
                "O exercício é obrigatório"
        );

        Objects.requireNonNull(
                avaliacao,
                "A avaliação biomecânica é obrigatória"
        );

        Objects.requireNonNull(
                avaliacao.itens(),
                "Os itens da avaliação biomecânica são obrigatórios"
        );

        validarAcoes(exercicio.acoesArticulares());

        Map<Articulacao, DetalhePontuacaoResponse> maioresPenalizacoes =
                new EnumMap<>(Articulacao.class);

        for (AvaliacaoBiomecanicaResponse item : avaliacao.itens()) {

            validarItem(item);

            Impacto impacto =
                    obterImpacto(
                            exercicio,
                            item.articulacao()
                    );

            AmplitudeMovimento maiorAmplitude =
                    obterMaiorAmplitude(
                            exercicio,
                            item.articulacao()
                    );

            /*
             * Considera a limitação quando há uma ação
             * na articulação ou impacto cadastrado nela.
             */
            boolean articulacaoUtilizada =
                    maiorAmplitude != null
                    || impacto != Impacto.NENHUM;

            if (!articulacaoUtilizada) {
                continue;
            }

            int penalizacao =
                    penalizacaoPorGravidade(item.gravidade())
                    + adicionalPorImpacto(impacto)
                    + adicionalPorExigencia(
                            item.tipoLimitacao(),
                            maiorAmplitude,
                            exercicio.estabilidadeExigida()
                    );

            String motivo =
                    "Limitação registrada: "
                    + item.tipoLimitacao()
                    + "; gravidade: "
                    + item.gravidade()
                    + "; lateralidade: "
                    + item.lateralidade()
                    + "; impacto cadastrado: "
                    + impacto
                    + "; maior amplitude cadastrada na articulação: "
                    + (
                            maiorAmplitude == null
                            ? "não informada"
                            : maiorAmplitude.name()
                    )
                    + "; estabilidade exigida pelo exercício: "
                    + exercicio.estabilidadeExigida()
                    + ". Penalização definida pela heurística "
                    + "biomecânica do MVP.";

            DetalhePontuacaoResponse detalhe =
                    new DetalhePontuacaoResponse(
                            "BIOMECANICA_" + item.tipoLimitacao().name() + "_001",
                            item.articulacao(),
                            penalizacao,
                            motivo
                    );

            /*
             * Mantém a maior penalização por articulação,
             * mesmo quando existem várias limitações nela.
             */
            DetalhePontuacaoResponse anterior =
                    maioresPenalizacoes.get(item.articulacao());

            if (anterior == null
                    || detalhe.risco() > anterior.risco()) {

                maioresPenalizacoes.put(
                        item.articulacao(),
                        detalhe
                );
            }
        }

        /*
         * Esta versão gera penalizações, sem estabelecer
         * bloqueio automático por limitação biomecânica.
         */
        return new ResultadoRegraBiomecanica(
                false,
                List.copyOf(maioresPenalizacoes.values())
        );
    }

    private void validarItem(
            AvaliacaoBiomecanicaResponse item) {

        Objects.requireNonNull(
                item,
                "Um item biomecânico não pode ser nulo"
        );

        Objects.requireNonNull(
                item.articulacao(),
                "A articulação da limitação é obrigatória"
        );

        Objects.requireNonNull(
                item.tipoLimitacao(),
                "O tipo de limitação é obrigatório"
        );

        Objects.requireNonNull(
                item.gravidade(),
                "A gravidade da limitação é obrigatória"
        );
    }

    private void validarAcoes(
            List<AcaoArticularVinculadaResponse> acoes) {

        Objects.requireNonNull(
                acoes,
                "A lista de ações articulares é obrigatória"
        );

        for (AcaoArticularVinculadaResponse acao : acoes) {

            Objects.requireNonNull(
                    acao,
                    "Uma ação articular não pode ser nula"
            );

            Objects.requireNonNull(
                    acao.articulacao(),
                    "A articulação da ação é obrigatória"
            );

            Objects.requireNonNull(
                    acao.amplitudeMovimento(),
                    "A amplitude da ação é obrigatória"
            );
        }
    }

    private AmplitudeMovimento obterMaiorAmplitude(
            ExercicioResponse exercicio,
            Articulacao articulacao) {

        return exercicio.acoesArticulares()
                .stream()
                .filter(acao ->
                        acao.articulacao() == articulacao
                )
                .map(AcaoArticularVinculadaResponse::amplitudeMovimento)
                .max(
                        Comparator.comparingInt(
                                this::ordemAmplitude
                        )
                )
                .orElse(null);
    }

    private int ordemAmplitude(
            AmplitudeMovimento amplitude) {

        return switch (amplitude) {
            case PARCIAL -> 1;
            case MODERADA -> 2;
            case COMPLETA -> 3;
        };
    }

    private int penalizacaoPorGravidade(
            GravidadeLesao gravidade) {

        return switch (gravidade) {
            case LEVE -> 10;
            case MODERADA -> 25;
            case GRAVE -> 40;
        };
    }

    private int adicionalPorImpacto(
            Impacto impacto) {

        return switch (impacto) {
            case NENHUM, BAIXO -> 0;
            case MEDIO -> 5;
            case ALTO -> 10;
        };
    }

    private int adicionalPorExigencia(
            TipoLimitacao tipo,
            AmplitudeMovimento amplitude,
            Estabilidade estabilidade) {

        return switch (tipo) {

            case RIGIDEZ, ENCURTAMENTO ->
                    adicionalPorAmplitude(amplitude);

            case HIPERMOBILIDADE, INSTABILIDADE ->
                    adicionalPorEstabilidade(
                            Objects.requireNonNull(
                                    estabilidade,
                                    "A estabilidade exigida é obrigatória"
                            )
                    );
        };
    }

    private int adicionalPorAmplitude(
            AmplitudeMovimento amplitude) {

        if (amplitude == null) {
            return 0;
        }

        return switch (amplitude) {
            case PARCIAL -> 0;
            case MODERADA -> 5;
            case COMPLETA -> 10;
        };
    }

    private int adicionalPorEstabilidade(
            Estabilidade estabilidade) {

        return switch (estabilidade) {
            case BAIXA -> 0;
            case MEDIA -> 5;
            case ALTA -> 10;
        };
    }

    private Impacto obterImpacto(
            ExercicioResponse exercicio,
            Articulacao articulacao) {

        Impacto impacto = switch (articulacao) {
            case CERVICAL -> exercicio.impactoCervical();
            case OMBRO -> exercicio.impactoOmbro();
            case COTOVELO -> exercicio.impactoCotovelo();
            case PUNHO -> exercicio.impactoPunho();
            case TORACICA -> exercicio.impactoToracica();
            case LOMBAR -> exercicio.impactoLombar();
            case QUADRIL -> exercicio.impactoQuadril();
            case JOELHO -> exercicio.impactoJoelho();
            case TORNOZELO -> exercicio.impactoTornozelo();
        };

        return Objects.requireNonNull(
                impacto,
                "O impacto do exercício não pode ser nulo"
        );
    }

    public record ResultadoRegraBiomecanica(

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}