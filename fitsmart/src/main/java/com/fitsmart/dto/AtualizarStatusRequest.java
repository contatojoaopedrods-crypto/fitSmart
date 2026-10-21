package com.fitsmart.dto;

import jakarta.validation.constraints.NotNull;

public record AtualizarStatusRequest(

        @NotNull(message = "O status é obrigatório")
        Boolean ativo

) {
}