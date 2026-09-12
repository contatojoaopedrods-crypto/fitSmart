package com.fitsmart.dto;

import java.math.BigDecimal;

import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoCircunferencia;

public record CircunferenciaResponse(

        Long id,
        TipoCircunferencia tipo,
        Lateralidade lateralidade,
        BigDecimal valorCm

) {
}