package com.fitsmart.dto;

import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateAvaliacaoBiomecanicaRequest(

        @NotNull(message = "A limitação é obrigatória")
        Long limitacaoId,

        @NotNull(message = "A lateralidade é obrigatória")
        Lateralidade lateralidade,

        @NotNull(message = "A gravidade é obrigatória")
        GravidadeLesao gravidade,

        @Size(
            max = 1000,
            message = "A observação deve possuir no máximo 1000 caracteres"
        )
        String observacao

) {
}