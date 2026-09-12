package com.fitsmart.dto;

import java.util.List;

public record AvaliacaoBiomecanicaCompletaResponse(

        Long avaliacaoFisicaId,
        Long alunoId,
        List<AvaliacaoBiomecanicaResponse> itens

) {
}