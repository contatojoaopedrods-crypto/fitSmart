package com.fitsmart.dto;

import java.util.List;

public record AvaliacaoCompletaResponse(

        AvaliacaoFisicaResponse avaliacaoFisica,

        AvaliacaoDorCompletaResponse avaliacaoDor,

        AvaliacaoBiomecanicaCompletaResponse avaliacaoBiomecanica,

        AvaliacaoMobilidadeResponse avaliacaoMobilidade,

        List<AvaliacaoLesaoResponse> historicoLesoes

) {
}