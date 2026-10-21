package com.fitsmart.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.model.enums.Objetivo;

public record ResultadoRecomendacaoResponse(

        Long alunoId,
        Long avaliacaoFisicaId,
        Objetivo objetivo,
        NivelExperiencia nivelExperienciaAluno,
        boolean apto,
        boolean geracaoBloqueada,
        String aviso,
        String versaoAlgoritmo,
        LocalDateTime geradoEm,
        List<RecomendacaoExercicioResponse> recomendacoes

) {
}