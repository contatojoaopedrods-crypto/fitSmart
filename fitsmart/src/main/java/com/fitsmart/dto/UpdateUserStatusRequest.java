package com.fitsmart.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateUserStatusRequest(

    @NotNull(message = "O status ativo é obrigatório")
    Boolean ativo
) {
    
}
