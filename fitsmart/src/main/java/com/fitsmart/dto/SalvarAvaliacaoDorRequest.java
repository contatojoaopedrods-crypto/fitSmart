package com.fitsmart.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SalvarAvaliacaoDorRequest(

        @NotNull(message = "A lista de itens avaliados é obrigatória")
        @Size(
            max = 30,
            message = "A avaliação permite no máximo 30 itens"
        )
        List<@Valid CreateAvaliacaoDorRequest> itens

) {
}