package com.fitsmart.dto;

import java.math.BigDecimal;

import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoDobraCutanea;

public record DobraCutaneaResponse(

        Long id,
        TipoDobraCutanea tipo,
        Lateralidade lateralidade,
        BigDecimal valorMm

) {
}