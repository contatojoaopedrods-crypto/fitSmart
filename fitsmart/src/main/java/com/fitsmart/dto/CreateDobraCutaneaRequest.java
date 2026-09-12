package com.fitsmart.dto;

import java.math.BigDecimal;

import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoDobraCutanea;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

public record CreateDobraCutaneaRequest(

        @NotNull(message = "O tipo da dobra é obrigatório")
        TipoDobraCutanea tipo,

        @NotNull(message = "A lateralidade da dobra é obrigatória")
        Lateralidade lateralidade,

        @NotNull(message = "O valor da dobra é obrigatório")
        @DecimalMin(
            value = "0.01",
            message = "O valor da dobra deve ser maior que zero"
        )
        @Digits(
            integer = 3,
            fraction = 2,
            message = "A dobra deve possuir no máximo 3 inteiros e 2 decimais"
        )
        BigDecimal valorMm

) {
}