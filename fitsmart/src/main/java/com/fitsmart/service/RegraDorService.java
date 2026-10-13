package com.fitsmart.service;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.AvaliacaoDorCompletaResponse;
import com.fitsmart.dto.AvaliacaoDorResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.Impacto;

@Service
public class RegraDorService {

    /*
     * Heurísticas da versão 1.0.0 do MVP.
     * Não representam diagnóstico, probabilidade de lesão
     * ou limiares clinicamente validados.
     *
     * O bloqueio afeta a sugestão deste exercício no sistema.
     */
    private static final int LIMIAR_BLOQUEIO_DOR = 7;

    private static final int PENALIZACAO_FAIXA_1 = 10;
    private static final int PENALIZACAO_FAIXA_2 = 25;
    private static final int PENALIZACAO_FAIXA_3 = 40;

    public ResultadoRegraDor analisar(
            ExercicioResponse exercicio,
            AvaliacaoDorCompletaResponse avaliacaoDor) {

        Objects.requireNonNull(
                exercicio,
                "O exercício é obrigatório"
        );

        Objects.requireNonNull(
                avaliacaoDor,
                "A avaliação de dor é obrigatória"
        );

        Objects.requireNonNull(
                avaliacaoDor.itens(),
                "Os itens da avaliação de dor são obrigatórios"
        );

        Objects.requireNonNull(
                exercicio.acoesArticulares(),
                "As ações articulares do exercício são obrigatórias"
        );

        /*
         * Considera o maior registro de dor relevante
         * de cada articulação. Isso evita que vários
         * registros da mesma articulação alterem a média
         * somente pela quantidade de itens cadastrados.
         */
        Map<Articulacao, AvaliacaoDorResponse> maioresDores =
                new EnumMap<>(Articulacao.class);

        for (AvaliacaoDorResponse dor : avaliacaoDor.itens()) {

            validarItem(dor);

            if (dor.intensidade() == 0) {
                continue;
            }

            if (!dorSeRelacionaAoExercicio(exercicio, dor)) {
                continue;
            }

            AvaliacaoDorResponse maiorDorAtual =
                    maioresDores.get(dor.articulacao());

            if (maiorDorAtual == null
                    || dor.intensidade()
                    > maiorDorAtual.intensidade()) {

                maioresDores.put(
                        dor.articulacao(),
                        dor
                );
            }
        }

        List<DetalhePontuacaoResponse> detalhes =
                new ArrayList<>();

        boolean bloqueado = false;

        for (AvaliacaoDorResponse dor : maioresDores.values()) {

            boolean bloqueioPorDor =
                    dor.intensidade() >= LIMIAR_BLOQUEIO_DOR;

            if (bloqueioPorDor) {
                bloqueado = true;
            }

            boolean mesmaAcao =
                    possuiMesmaAcao(exercicio, dor);

            String relacao = mesmaAcao
                    ? "O exercício utiliza a ação articular avaliada."
                    : "O exercício possui impacto cadastrado "
                      + "na articulação avaliada.";

            String criterio = bloqueioPorDor
                    ? "DOR_INTENSA_001"
                    : "DOR_MOVIMENTO_001";

            String motivo =
                    "Dor registrada: "
                    + dor.intensidade()
                    + "/10; ação: "
                    + dor.acaoArticularNome()
                    + "; lateralidade: "
                    + dor.lateralidade()
                    + ". "
                    + relacao;

            if (bloqueioPorDor) {
                motivo +=
                        " A heurística do MVP bloqueia a sugestão "
                        + "deste exercício e exige revisão profissional.";
            }

            detalhes.add(
                    new DetalhePontuacaoResponse(
                            criterio,
                            dor.articulacao(),
                            calcularPenalizacao(dor.intensidade()),
                            motivo
                    )
            );
        }

        return new ResultadoRegraDor(
                bloqueado,
                List.copyOf(detalhes)
        );
    }

    private void validarItem(AvaliacaoDorResponse dor) {

        Objects.requireNonNull(
                dor,
                "Um item da avaliação de dor não pode ser nulo"
        );

        Objects.requireNonNull(
                dor.articulacao(),
                "A articulação da avaliação de dor é obrigatória"
        );

        Objects.requireNonNull(
                dor.acaoArticularId(),
                "A ação articular da avaliação de dor é obrigatória"
        );

        Objects.requireNonNull(
                dor.intensidade(),
                "A intensidade da dor é obrigatória"
        );

        if (dor.intensidade() < 0 || dor.intensidade() > 10) {
            throw new IllegalArgumentException(
                    "A intensidade da dor deve estar entre 0 e 10"
            );
        }
    }

    private boolean dorSeRelacionaAoExercicio(
            ExercicioResponse exercicio,
            AvaliacaoDorResponse dor) {

        return possuiMesmaAcao(exercicio, dor)
                || obterImpacto(
                        exercicio,
                        dor.articulacao()
                ) != Impacto.NENHUM;
    }

    private boolean possuiMesmaAcao(
            ExercicioResponse exercicio,
            AvaliacaoDorResponse dor) {

        return exercicio.acoesArticulares()
                .stream()
                .anyMatch(acao ->
                        dor.acaoArticularId().equals(
                                acao.acaoArticularId()
                        )
                );
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

    private int calcularPenalizacao(int intensidade) {

        if (intensidade >= LIMIAR_BLOQUEIO_DOR) {
            return PENALIZACAO_FAIXA_3;
        }

        if (intensidade >= 4) {
            return PENALIZACAO_FAIXA_2;
        }

        return PENALIZACAO_FAIXA_1;
    }

    public record ResultadoRegraDor(

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}