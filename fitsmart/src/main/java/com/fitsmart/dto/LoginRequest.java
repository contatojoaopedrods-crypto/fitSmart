package com.fitsmart.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(


    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Informe um e-mail válido")
    String email,

    @NotBlank(message = "A senha é obrigat[oria")
    String senha
) {
} 
    

