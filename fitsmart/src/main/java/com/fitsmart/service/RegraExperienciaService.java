package com.fitsmart.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.model.enums.NivelExperiencia;

@Service
public class RegraExperienciaService {

    /*
     * Política provisória da versão 1.0.0 do MVP.
     *
     * A diferença de experiência representa adequação
     * técnica no sistema, não probabilidade de lesão.
     */
    private static final int PENALIZACAO_UM_NIVEL = 20;
    private static final int PENALIZACAO_DOIS_NIVEIS = 40;

    public ResultadoRegraExperiencia analisar(
            ExercicioResponse exercicio,
            NivelExperiencia nivelAluno) {

        Objects.requireNonNull(
                exercicio,
                "O exercício é obrigatório"
        );

        Objects.requireNonNull(
                nivelAluno,
                "O nível de experiência do aluno é obrigatório"
        );

        NivelExperiencia nivelExigido =
                Objects.requireNonNull(
                        exercicio.nivelExperiencia(),
                        "O nível exigido pelo exercício é obrigatório"
                );

        int diferenca =
                ordemNivel(nivelExigido)
                - ordemNivel(nivelAluno);

        /*
         * O aluno atende ou supera o nível exigido.
         * Não há penalização nesta regra.
         */
        if (diferenca <= 0) {
            return new ResultadoRegraExperiencia(
                    false,
                    List.of()
            );
        }

        /*
         * Na política inicial do MVP:
         *
         * Um nível acima: penaliza e exige atenção.
         * Dois níveis acima: bloqueia a sugestão.
         */
        boolean bloqueado = diferenca >= 2;

        int penalizacao = bloqueado
                ? PENALIZACAO_DOIS_NIVEIS
                : PENALIZACAO_UM_NIVEL;

        String motivo =
                "Nível do aluno: "
                + nivelAluno
                + "; nível exigido pelo exercício: "
                + nivelExigido
                + ".";

        if (bloqueado) {
            motivo +=
                    " A diferença de dois níveis bloqueia "
                    + "a sugestão automática pela política do MVP.";
        } else {
            motivo +=
                    " O exercício exige um nível acima "
                    + "do registrado para o aluno. "
                    + "Requer revisão do professor.";
        }

        DetalhePontuacaoResponse detalhe =
                new DetalhePontuacaoResponse(
                        bloqueado
                                ? "EXPERIENCIA_INSUFICIENTE_001"
                                : "EXPERIENCIA_ATENCAO_001",
                        null,
                        penalizacao,
                        motivo
                );

        return new ResultadoRegraExperiencia(
                bloqueado,
                List.of(detalhe)
        );
    }

    private int ordemNivel(
            NivelExperiencia nivel) {

        return switch (nivel) {
            case INICIANTE -> 1;
            case INTERMEDIARIO -> 2;
            case AVANCADO -> 3;
        };
    }

    public record ResultadoRegraExperiencia(

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}