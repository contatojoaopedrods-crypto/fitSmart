package com.fitsmart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitsmart.model.enums.UserRole;

public record LoginResponse(
        Long id,
        String nome,
        String sobrenome,
        String email,

        @JsonProperty("tipo_usuario") 
        UserRole tipoUsuario,

        String token,

        @JsonProperty("token_type")
        String tokenType,

        @JsonProperty("expires_in") 
        long expires_in) {

}
