package com.fitsmart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdatePasswordRequest(

    @JsonProperty("senha_atual")
    @NotBlank(message = "A senha atual é obrigatória")
    String senhaAtual,

    @JsonProperty("nova_senha")
    @NotBlank(message = "A nova senha é obrigatória")
    @Size(
        min = 8,
        max = 100,
        message = "A nova senha deve ter pelo menos 8 caracteres"
    )
    String novaSenha,

    @JsonProperty("confirmacao_nova_senha")
    @NotBlank(message = "A confirmação da nova senha é obrigatória")
    String confirmacaoNovaSenha
) {
}