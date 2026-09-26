package com.fitsmart.dto;

import java.util.List;

import com.fitsmart.model.enums.ClassificacaoRecomendacao;
import com.fitsmart.model.enums.DificuldadeExercicio;
import com.fitsmart.model.enums.NivelExperiencia;

public record RecomendacaoExercicioResponse(

        Long exercicioId,
        String nome,
        NivelExperiencia nivelExperienciaExigido,
        DificuldadeExercicio dificuldade,
        int compatibilidade,
        int riscoCalculado,
        ClassificacaoRecomendacao classificacao,
        List<DetalhePontuacaoResponse> detalhes

) {
}