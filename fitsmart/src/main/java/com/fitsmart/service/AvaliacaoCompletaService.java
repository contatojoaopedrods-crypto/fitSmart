package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoBiomecanicaCompletaResponse;
import com.fitsmart.dto.AvaliacaoCompletaResponse;
import com.fitsmart.dto.AvaliacaoDorCompletaResponse;
import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.dto.AvaliacaoLesaoResponse;
import com.fitsmart.dto.AvaliacaoMobilidadeResponse;

@Service
public class AvaliacaoCompletaService {

    private final AvaliacaoFisicaService
            avaliacaoFisicaService;

    private final AvaliacaoDorService
            avaliacaoDorService;

    private final AvaliacaoBiomecanicaService
            avaliacaoBiomecanicaService;

    private final AvaliacaoMobilidadeService
            avaliacaoMobilidadeService;

    private final AvaliacaoLesaoService
            avaliacaoLesaoService;

    public AvaliacaoCompletaService(
            AvaliacaoFisicaService avaliacaoFisicaService,
            AvaliacaoDorService avaliacaoDorService,
            AvaliacaoBiomecanicaService
                    avaliacaoBiomecanicaService,
            AvaliacaoMobilidadeService
                    avaliacaoMobilidadeService,
            AvaliacaoLesaoService avaliacaoLesaoService) {

        this.avaliacaoFisicaService =
                avaliacaoFisicaService;

        this.avaliacaoDorService =
                avaliacaoDorService;

        this.avaliacaoBiomecanicaService =
                avaliacaoBiomecanicaService;

        this.avaliacaoMobilidadeService =
                avaliacaoMobilidadeService;

        this.avaliacaoLesaoService =
                avaliacaoLesaoService;
    }

    @Transactional(readOnly = true)
    public AvaliacaoCompletaResponse getAvaliacaoCompleta(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        AvaliacaoFisicaResponse avaliacaoFisica =
                avaliacaoFisicaService.getAvaliacao(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        AvaliacaoDorCompletaResponse avaliacaoDor =
                avaliacaoDorService.getAvaliacao(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        AvaliacaoBiomecanicaCompletaResponse
                avaliacaoBiomecanica =
                        avaliacaoBiomecanicaService
                                .getAvaliacao(
                                        professorUserId,
                                        alunoId,
                                        avaliacaoId
                                );

        AvaliacaoMobilidadeResponse avaliacaoMobilidade =
                avaliacaoMobilidadeService.getAvaliacao(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        List<AvaliacaoLesaoResponse> historicoLesoes =
                avaliacaoLesaoService.listAvaliacoes(
                        professorUserId,
                        alunoId
                );

        return new AvaliacaoCompletaResponse(
                avaliacaoFisica,
                avaliacaoDor,
                avaliacaoBiomecanica,
                avaliacaoMobilidade,
                historicoLesoes
        );
    }
}