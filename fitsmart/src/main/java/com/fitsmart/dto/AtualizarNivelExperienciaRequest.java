package com.fitsmart.dto;

import com.fitsmart.model.enums.NivelExperiencia;

import jakarta.validation.constraints.NotNull;

public record AtualizarNivelExperienciaRequest(

        @NotNull(message = "O nível de experiência é obrigatório")
        NivelExperiencia nivelExperiencia

) {
}