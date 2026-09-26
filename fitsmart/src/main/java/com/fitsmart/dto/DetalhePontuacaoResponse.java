package com.fitsmart.dto;

import com.fitsmart.model.enums.Articulacao;

public record DetalhePontuacaoResponse(

        String criterio,
        Articulacao articulacao,
        int risco,
        String motivo

) {
}