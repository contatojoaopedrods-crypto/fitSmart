package com.fitsmart.dto;

import com.fitsmart.model.enums.TipoEquipamento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SalvarEquipamentoRequest(

        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotNull(message = "O tipo é obrigatório")
        TipoEquipamento tipo

) {
}