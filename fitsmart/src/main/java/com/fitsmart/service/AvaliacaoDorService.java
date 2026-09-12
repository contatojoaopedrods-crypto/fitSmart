package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoDorCompletaResponse;
import com.fitsmart.dto.AvaliacaoDorResponse;
import com.fitsmart.dto.CreateAvaliacaoDorRequest;
import com.fitsmart.dto.SalvarAvaliacaoDorRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.AcaoArticular;
import com.fitsmart.model.AvaliacaoDor;
import com.fitsmart.model.AvaliacaoFisica;
import com.fitsmart.repository.AcaoArticularRepository;
import com.fitsmart.repository.AvaliacaoDorRepository;
import com.fitsmart.repository.AvaliacaoFisicaRepository;

@Service
public class AvaliacaoDorService {

    private final AvaliacaoDorRepository avaliacaoDorRepository;
    private final AvaliacaoFisicaRepository avaliacaoFisicaRepository;
    private final AcaoArticularRepository acaoArticularRepository;

    public AvaliacaoDorService(
            AvaliacaoDorRepository avaliacaoDorRepository,
            AvaliacaoFisicaRepository avaliacaoFisicaRepository,
            AcaoArticularRepository acaoArticularRepository) {

        this.avaliacaoDorRepository = avaliacaoDorRepository;
        this.avaliacaoFisicaRepository = avaliacaoFisicaRepository;
        this.acaoArticularRepository = acaoArticularRepository;
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

    private AcaoArticular findAcaoArticular(Long acaoArticularId) {

        return acaoArticularRepository
                .findById(acaoArticularId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ação articular não encontrada"
                        )
                );
    }

    private AvaliacaoDor montarItem(
            AvaliacaoFisica avaliacaoFisica,
            CreateAvaliacaoDorRequest request) {

        AcaoArticular acaoArticular =
                findAcaoArticular(request.acaoArticularId());

        return new AvaliacaoDor(
                avaliacaoFisica,
                acaoArticular,
                request.lateralidade(),
                request.intensidade()
        );
    }

    private AvaliacaoDorResponse convertToResponse(
            AvaliacaoDor avaliacaoDor) {

        AcaoArticular acao =
                avaliacaoDor.getAcaoArticular();

        return new AvaliacaoDorResponse(
                avaliacaoDor.getId(),
                acao.getId(),
                acao.getNome(),
                acao.getArticulacao(),
                acao.getPlanoMovimento(),
                avaliacaoDor.getLateralidade(),
                avaliacaoDor.getIntensidade()
        );
    }

    private AvaliacaoDorCompletaResponse montarResponse(
            AvaliacaoFisica avaliacaoFisica,
            List<AvaliacaoDor> itens) {

        List<AvaliacaoDorResponse> itensResponse = itens
                .stream()
                .map(this::convertToResponse)
                .toList();

        return new AvaliacaoDorCompletaResponse(
                avaliacaoFisica.getId(),
                avaliacaoFisica.getAluno().getId(),
                itensResponse
        );
    }

    @Transactional
    public AvaliacaoDorCompletaResponse salvarAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId,
            SalvarAvaliacaoDorRequest request) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        avaliacaoDorRepository
                .deleteAllByAvaliacaoFisica_Id(avaliacaoId);

        avaliacaoDorRepository.flush();

        List<AvaliacaoDor> novosItens = request.itens()
                .stream()
                .map(item -> montarItem(
                        avaliacaoFisica,
                        item
                ))
                .toList();

        List<AvaliacaoDor> itensSalvos =
                avaliacaoDorRepository.saveAll(novosItens);

        return montarResponse(
                avaliacaoFisica,
                itensSalvos
        );
    }

    @Transactional(readOnly = true)
    public AvaliacaoDorCompletaResponse getAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        List<AvaliacaoDor> itens =
                avaliacaoDorRepository
                        .findAllByAvaliacaoFisica_IdOrderByIdAsc(
                                avaliacaoId
                        );

        return montarResponse(
                avaliacaoFisica,
                itens
        );
    }
}