package com.fitsmart.service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.AvaliacaoMobilidadeResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.ExercicioResponse.AcaoArticularVinculadaResponse;
import com.fitsmart.model.enums.AmplitudeMovimento;
import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.NivelMobilidade;

@Service
public class RegraMobilidadeService {

    /*
     * Heurísticas da versão 1.0.0 do MVP.
     *
     * A associação entre nível de mobilidade e amplitude
     * exigida é uma aproximação do sistema, sem validação
     * clínica. Não representa diagnóstico ou prescrição.
     */

    public ResultadoRegraMobilidade analisar(
            ExercicioResponse exercicio,
            AvaliacaoMobilidadeResponse mobilidade) {

        Objects.requireNonNull(
                exercicio,
                "O exercício é obrigatório"
        );

        Objects.requireNonNull(
                mobilidade,
                "A avaliação de mobilidade é obrigatória"
        );

        Objects.requireNonNull(
                exercicio.acoesArticulares(),
                "A lista de ações articulares é obrigatória"
        );

        /*
         * Sem ações cadastradas, não é possível comparar
         * as amplitudes exigidas pelo exercício.
         *
         * O bloqueio representa cadastro insuficiente
         * para esta análise, não contraindicação clínica.
         */
        if (exercicio.acoesArticulares().isEmpty()) {

            DetalhePontuacaoResponse detalhe =
                    new DetalhePontuacaoResponse(
                            "CATALOGO_SEM_ACOES_001",
                            null,
                            0,
                            "O exercício não possui ações articulares "
                            + "cadastradas. Não foi possível analisar "
                            + "a exigência de mobilidade."
                    );

            return new ResultadoRegraMobilidade(
                    true,
                    List.of(detalhe)
            );
        }

        /*
         * Guarda somente a maior penalização por
         * articulação, evitando contar a mesma região
         * várias vezes por ter mais ações cadastradas.
         */
        Map<Articulacao, DetalhePontuacaoResponse> maioresPenalizacoes =
                new EnumMap<>(Articulacao.class);

        for (AcaoArticularVinculadaResponse acao
                : exercicio.acoesArticulares()) {

            validarAcao(acao);

            NivelMobilidade nivel =
                    obterNivel(
                            mobilidade,
                            acao.articulacao()
                    );

            int penalizacao =
                    calcularPenalizacao(
                            nivel,
                            acao.amplitudeMovimento()
                    );

            if (penalizacao == 0) {
                continue;
            }

            DetalhePontuacaoResponse detalhe =
                    new DetalhePontuacaoResponse(
                            "MOBILIDADE_AMPLITUDE_001",
                            acao.articulacao(),
                            penalizacao,
                            "Mobilidade registrada: "
                            + nivel
                            + "; ação: "
                            + acao.nome()
                            + "; amplitude exigida: "
                            + acao.amplitudeMovimento()
                            + ". Penalização definida pela heurística "
                            + "de mobilidade do MVP."
                    );

            DetalhePontuacaoResponse anterior =
                    maioresPenalizacoes.get(
                            acao.articulacao()
                    );

            if (anterior == null
                    || detalhe.risco() > anterior.risco()) {

                maioresPenalizacoes.put(
                        acao.articulacao(),
                        detalhe
                );
            }
        }

        return new ResultadoRegraMobilidade(
                false,
                List.copyOf(maioresPenalizacoes.values())
        );
    }

    private void validarAcao(
            AcaoArticularVinculadaResponse acao) {

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
                "A amplitude de movimento é obrigatória"
        );
    }

    private NivelMobilidade obterNivel(
            AvaliacaoMobilidadeResponse mobilidade,
            Articulacao articulacao) {

        NivelMobilidade nivel = switch (articulacao) {
            case CERVICAL -> mobilidade.cervical();
            case OMBRO -> mobilidade.ombro();
            case COTOVELO -> mobilidade.cotovelo();
            case PUNHO -> mobilidade.punho();
            case TORACICA -> mobilidade.toracica();
            case LOMBAR -> mobilidade.lombar();
            case QUADRIL -> mobilidade.quadril();
            case JOELHO -> mobilidade.joelho();
            case TORNOZELO -> mobilidade.tornozelo();
        };

        return Objects.requireNonNull(
                nivel,
                "A mobilidade da articulação deve estar preenchida"
        );
    }

    private int calcularPenalizacao(
            NivelMobilidade nivel,
            AmplitudeMovimento amplitude) {

        return switch (nivel) {

            case RUIM -> switch (amplitude) {
                case PARCIAL -> 10;
                case MODERADA -> 25;
                case COMPLETA -> 40;
            };

            case REGULAR -> switch (amplitude) {
                case PARCIAL -> 0;
                case MODERADA -> 10;
                case COMPLETA -> 20;
            };

            case BOM, EXCELENTE -> 0;
        };
    }

    public record ResultadoRegraMobilidade(

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}