package com.fitsmart.dto;

import com.fitsmart.model.enums.NivelMobilidade;

public record AvaliacaoMobilidadeResponse(

        Long id,
        Long avaliacaoFisicaId,
        Long alunoId,
        NivelMobilidade cervical,
        NivelMobilidade ombro,
        NivelMobilidade cotovelo,
        NivelMobilidade punho,
        NivelMobilidade toracica,
        NivelMobilidade lombar,
        NivelMobilidade quadril,
        NivelMobilidade joelho,
        NivelMobilidade tornozelo,
        String observacao

) {
}