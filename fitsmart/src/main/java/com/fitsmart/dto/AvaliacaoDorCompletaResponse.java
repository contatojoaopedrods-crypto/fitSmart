package com.fitsmart.dto;

import java.util.List;

public record AvaliacaoDorCompletaResponse(

        Long avaliacaoFisicaId,
        Long alunoId,
        List<AvaliacaoDorResponse> itens

) {
}