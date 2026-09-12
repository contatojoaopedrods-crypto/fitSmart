package com.fitsmart.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fitsmart.model.enums.Objetivo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateAvaliacaoFisicaRequest(

        @NotNull(message = "O peso é obrigatório")
        @DecimalMin(
            value = "0.01",
            message = "O peso deve ser maior que zero"
        )
        @Digits(
            integer = 3,
            fraction = 2,
            message = "O peso deve possuir no máximo 3 inteiros e 2 decimais"
        )
        BigDecimal peso,

        @NotNull(message = "A altura é obrigatória")
        @DecimalMin(
            value = "0.01",
            message = "A altura deve ser maior que zero"
        )
        @Digits(
            integer = 3,
            fraction = 2,
            message = "A altura deve possuir no máximo 3 inteiros e 2 decimais"
        )
        BigDecimal altura,

        @NotNull(message = "O objetivo é obrigatório")
        Objetivo objetivo,

        @Size(
            max = 2000,
            message = "As observações devem possuir no máximo 2000 caracteres"
        )
        String observacoes,

        @NotNull(message = "A informação de aptidão é obrigatória")
        Boolean apto,

        @NotNull(message = "A lista de dobras é obrigatória")
        @Size(
            min = 7,
            max = 9,
            message = "Informe entre 7 e 9 dobras cutâneas"
        )
        List<@Valid CreateDobraCutaneaRequest> dobrasCutaneas,

        @NotNull(message = "A lista de circunferências é obrigatória")
        List<@Valid CreateCircunferenciaRequest> circunferencias,

        @NotNull(message = "A lista de fotos é obrigatória")
        @Size(
            max = 4,
            message = "A avaliação permite no máximo 4 fotos"
        )
        List<@Valid CreateFotoAvaliacaoRequest> fotos

) {
}