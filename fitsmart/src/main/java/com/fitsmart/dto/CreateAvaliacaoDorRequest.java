package com.fitsmart.dto;

import com.fitsmart.model.enums.Lateralidade;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateAvaliacaoDorRequest(

        @NotNull(message = "A ação articular é obrigatória")
        Long acaoArticularId,

        @NotNull(message = "A lateralidade é obrigatória")
        Lateralidade lateralidade,

        @NotNull(message = "A intensidade da dor é obrigatória")
        @Min(
            value = 0,
            message = "A intensidade da dor deve ser no mínimo 0"
        )
        @Max(
            value = 10,
            message = "A intensidade da dor deve ser no máximo 10"
        )
        Integer intensidade

) {
}