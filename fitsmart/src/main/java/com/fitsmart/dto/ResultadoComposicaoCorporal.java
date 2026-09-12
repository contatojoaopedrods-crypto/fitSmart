package com.fitsmart.dto;

import java.math.BigDecimal;

public record ResultadoComposicaoCorporal(

        BigDecimal imc,

        BigDecimal percentualGordura,

        BigDecimal massaGorda,

        BigDecimal massaMagra,

        String protocoloCalculo

) {
}