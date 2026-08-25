package com.fitsmart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateEmailRequest(

    @JsonProperty("novo_email")
    @NotBlank(message = "O novo e-mail é obrigatório")
    @Email(message = "Informe um e-mail válido")
    String novoEmail,

    @JsonProperty("senha_atual")
    @NotBlank(message = "A senha atual é obrigatória")
    String senhaAtual
) {
}