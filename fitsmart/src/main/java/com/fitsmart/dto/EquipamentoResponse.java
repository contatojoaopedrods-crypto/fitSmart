package com.fitsmart.dto;

import com.fitsmart.model.enums.TipoEquipamento;

public record EquipamentoResponse(

        Long id,
        String nome,
        TipoEquipamento tipo,
        boolean ativo

) {
}