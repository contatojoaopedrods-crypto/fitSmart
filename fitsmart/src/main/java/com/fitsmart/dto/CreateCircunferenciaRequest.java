package com.fitsmart.dto;

import java.math.BigDecimal;

import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoCircunferencia;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

public record CreateCircunferenciaRequest(

        @NotNull(message = "O tipo da circunferência é obrigatório")
        TipoCircunferencia tipo,

        @NotNull(message = "A lateralidade da circunferência é obrigatória")
        Lateralidade lateralidade,

        @NotNull(message = "O valor da circunferência é obrigatório")
        @DecimalMin(
            value = "0.01",
            message = "A circunferência deve ser maior que zero"
        )
        @Digits(
            integer = 3,
            fraction = 2,
            message = "A circunferência deve possuir no máximo 3 inteiros e 2 decimais"
        )
        BigDecimal valorCm

) {
}