package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoBiomecanicaCompletaResponse;
import com.fitsmart.dto.AvaliacaoBiomecanicaResponse;
import com.fitsmart.dto.CreateAvaliacaoBiomecanicaRequest;
import com.fitsmart.dto.SalvarAvaliacaoBiomecanicaRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.AvaliacaoBiomecanica;
import com.fitsmart.model.AvaliacaoFisica;
import com.fitsmart.model.LimitacaoBiomecanica;
import com.fitsmart.repository.AvaliacaoBiomecanicaRepository;
import com.fitsmart.repository.AvaliacaoFisicaRepository;
import com.fitsmart.repository.LimitacaoBiomecanicaRepository;

@Service
public class AvaliacaoBiomecanicaService {

    private final AvaliacaoBiomecanicaRepository avaliacaoRepository;
    private final AvaliacaoFisicaRepository avaliacaoFisicaRepository;
    private final LimitacaoBiomecanicaRepository limitacaoRepository;

    public AvaliacaoBiomecanicaService(
            AvaliacaoBiomecanicaRepository avaliacaoRepository,
            AvaliacaoFisicaRepository avaliacaoFisicaRepository,
            LimitacaoBiomecanicaRepository limitacaoRepository) {

        this.avaliacaoRepository = avaliacaoRepository;
        this.avaliacaoFisicaRepository = avaliacaoFisicaRepository;
        this.limitacaoRepository = limitacaoRepository;
    }

    private AvaliacaoFisica findAvaliacaoDoProfessor(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        return avaliacaoFisicaRepository
                .findByIdAndAluno_IdAndProfessor_User_Id(
                        avaliacaoId,
                        alunoId,
                        professorUserId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Avaliação física não encontrada"
                        )
                );
    }

    private LimitacaoBiomecanica findLimitacao(Long limitacaoId) {

        return limitacaoRepository
                .findByIdAndAtivaTrue(limitacaoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Limitação biomecânica não encontrada"
                        )
                );
    }

    private AvaliacaoBiomecanica montarItem(
            AvaliacaoFisica avaliacaoFisica,
            CreateAvaliacaoBiomecanicaRequest request) {

        LimitacaoBiomecanica limitacao =
                findLimitacao(request.limitacaoId());

        return new AvaliacaoBiomecanica(
                avaliacaoFisica,
                limitacao,
                request.lateralidade(),
                request.gravidade(),
                request.observacao()
        );
    }

    private AvaliacaoBiomecanicaResponse convertToResponse(
            AvaliacaoBiomecanica avaliacao) {

        LimitacaoBiomecanica limitacao =
                avaliacao.getLimitacao();

        return new AvaliacaoBiomecanicaResponse(
                avaliacao.getId(),
                limitacao.getId(),
                limitacao.getArticulacao(),
                limitacao.getTipoLimitacao(),
                avaliacao.getLateralidade(),
                avaliacao.getGravidade(),
                avaliacao.getObservacao()
        );
    }

    private AvaliacaoBiomecanicaCompletaResponse montarResponse(
            AvaliacaoFisica avaliacaoFisica,
            List<AvaliacaoBiomecanica> itens) {

        List<AvaliacaoBiomecanicaResponse> itensResponse = itens
                .stream()
                .map(this::convertToResponse)
                .toList();

        return new AvaliacaoBiomecanicaCompletaResponse(
                avaliacaoFisica.getId(),
                avaliacaoFisica.getAluno().getId(),
                itensResponse
        );
    }

    @Transactional
    public AvaliacaoBiomecanicaCompletaResponse salvarAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId,
            SalvarAvaliacaoBiomecanicaRequest request) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        avaliacaoRepository
                .deleteAllByAvaliacaoFisica_Id(avaliacaoId);

        avaliacaoRepository.flush();

        List<AvaliacaoBiomecanica> novosItens = request.itens()
                .stream()
                .map(item -> montarItem(
                        avaliacaoFisica,
                        item
                ))
                .toList();

        List<AvaliacaoBiomecanica> itensSalvos =
                avaliacaoRepository.saveAll(novosItens);

        return montarResponse(
                avaliacaoFisica,
                itensSalvos
        );
    }

    @Transactional(readOnly = true)
    public AvaliacaoBiomecanicaCompletaResponse getAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        List<AvaliacaoBiomecanica> itens =
                avaliacaoRepository
                        .findAllByAvaliacaoFisica_IdOrderByIdAsc(
                                avaliacaoId
                        );

        return montarResponse(
                avaliacaoFisica,
                itens
        );
    }
}