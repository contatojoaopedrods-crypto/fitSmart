package com.fitsmart.dto;

import com.fitsmart.model.enums.TipoFotoAvaliacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateFotoAvaliacaoRequest(

        @NotNull(message = "O tipo da foto é obrigatório")
        TipoFotoAvaliacao tipo,

        @NotBlank(message = "O caminho da foto é obrigatório")
        @Size(
            max = 500,
            message = "O caminho da foto deve possuir no máximo 500 caracteres"
        )
        String caminhoArquivo

) {
}