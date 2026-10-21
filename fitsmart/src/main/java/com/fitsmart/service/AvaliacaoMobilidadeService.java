package com.fitsmart.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoMobilidadeResponse;
import com.fitsmart.dto.SalvarAvaliacaoMobilidadeRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.AvaliacaoFisica;
import com.fitsmart.model.AvaliacaoMobilidade;
import com.fitsmart.repository.AvaliacaoFisicaRepository;
import com.fitsmart.repository.AvaliacaoMobilidadeRepository;

@Service
public class AvaliacaoMobilidadeService {

    private final AvaliacaoMobilidadeRepository
            avaliacaoMobilidadeRepository;

    private final AvaliacaoFisicaRepository
            avaliacaoFisicaRepository;

    private final StatusAvaliacaoComplementarService
            statusService;

    public AvaliacaoMobilidadeService(
            AvaliacaoMobilidadeRepository
                    avaliacaoMobilidadeRepository,
            AvaliacaoFisicaRepository
                    avaliacaoFisicaRepository,
            StatusAvaliacaoComplementarService
                    statusService) {

        this.avaliacaoMobilidadeRepository =
                avaliacaoMobilidadeRepository;

        this.avaliacaoFisicaRepository =
                avaliacaoFisicaRepository;

        this.statusService = statusService;
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

    private AvaliacaoMobilidade findMobilidade(
            Long avaliacaoFisicaId) {

        return avaliacaoMobilidadeRepository
                .findByAvaliacaoFisica_Id(
                        avaliacaoFisicaId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Avaliação de mobilidade não encontrada"
                        )
                );
    }

    private void atualizarDados(
            AvaliacaoMobilidade avaliacao,
            SalvarAvaliacaoMobilidadeRequest request) {

        avaliacao.setCervical(request.cervical());
        avaliacao.setOmbro(request.ombro());
        avaliacao.setCotovelo(request.cotovelo());
        avaliacao.setPunho(request.punho());
        avaliacao.setToracica(request.toracica());
        avaliacao.setLombar(request.lombar());
        avaliacao.setQuadril(request.quadril());
        avaliacao.setJoelho(request.joelho());
        avaliacao.setTornozelo(request.tornozelo());
        avaliacao.setObservacao(request.observacao());
    }

    private boolean possuiTodosOsNiveis(
            SalvarAvaliacaoMobilidadeRequest request) {

        return request.cervical() != null
                && request.ombro() != null
                && request.cotovelo() != null
                && request.punho() != null
                && request.toracica() != null
                && request.lombar() != null
                && request.quadril() != null
                && request.joelho() != null
                && request.tornozelo() != null;
    }

    private AvaliacaoMobilidadeResponse convertToResponse(
            AvaliacaoMobilidade avaliacao) {

        AvaliacaoFisica avaliacaoFisica =
                avaliacao.getAvaliacaoFisica();

        return new AvaliacaoMobilidadeResponse(
                avaliacao.getId(),
                avaliacaoFisica.getId(),
                avaliacaoFisica.getAluno().getId(),
                avaliacao.getCervical(),
                avaliacao.getOmbro(),
                avaliacao.getCotovelo(),
                avaliacao.getPunho(),
                avaliacao.getToracica(),
                avaliacao.getLombar(),
                avaliacao.getQuadril(),
                avaliacao.getJoelho(),
                avaliacao.getTornozelo(),
                avaliacao.getObservacao()
        );
    }

    @Transactional
    public AvaliacaoMobilidadeResponse salvarAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId,
            SalvarAvaliacaoMobilidadeRequest request) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        AvaliacaoMobilidade avaliacao =
                avaliacaoMobilidadeRepository
                        .findByAvaliacaoFisica_Id(
                                avaliacaoId
                        )
                        .orElseGet(() ->
                                new AvaliacaoMobilidade(
                                        avaliacaoFisica
                                )
                        );

        atualizarDados(
                avaliacao,
                request
        );

        AvaliacaoMobilidade avaliacaoSalva =
                avaliacaoMobilidadeRepository.save(
                        avaliacao
                );

        statusService.atualizarMobilidadeConcluida(
                avaliacaoFisica,
                possuiTodosOsNiveis(request)
        );

        return convertToResponse(
                avaliacaoSalva
        );
    }

    @Transactional(readOnly = true)
    public AvaliacaoMobilidadeResponse getAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        findAvaliacaoDoProfessor(
                professorUserId,
                alunoId,
                avaliacaoId
        );

        AvaliacaoMobilidade avaliacao =
                findMobilidade(
                        avaliacaoId
                );

        return convertToResponse(
                avaliacao
        );
    }
}