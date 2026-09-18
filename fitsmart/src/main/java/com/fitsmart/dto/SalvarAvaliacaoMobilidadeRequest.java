package com.fitsmart.dto;

import com.fitsmart.model.enums.NivelMobilidade;

import jakarta.validation.constraints.Size;

public record SalvarAvaliacaoMobilidadeRequest(

        NivelMobilidade cervical,

        NivelMobilidade ombro,

        NivelMobilidade cotovelo,

        NivelMobilidade punho,

        NivelMobilidade toracica,

        NivelMobilidade lombar,

        NivelMobilidade quadril,

        NivelMobilidade joelho,

        NivelMobilidade tornozelo,

        @Size(
            max = 2000,
            message = "A observação deve possuir no máximo 2000 caracteres"
        )
        String observacao

) {
}