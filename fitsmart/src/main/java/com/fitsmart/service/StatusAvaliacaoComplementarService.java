package com.fitsmart.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.StatusAvaliacaoComplementarResponse;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.AvaliacaoFisica;
import com.fitsmart.model.StatusAvaliacaoComplementar;
import com.fitsmart.repository.AvaliacaoFisicaRepository;
import com.fitsmart.repository.StatusAvaliacaoComplementarRepository;

@Service
public class StatusAvaliacaoComplementarService {

    private final StatusAvaliacaoComplementarRepository
            statusRepository;

    private final AvaliacaoFisicaRepository
            avaliacaoFisicaRepository;

    public StatusAvaliacaoComplementarService(
            StatusAvaliacaoComplementarRepository statusRepository,
            AvaliacaoFisicaRepository avaliacaoFisicaRepository) {

        this.statusRepository = statusRepository;
        this.avaliacaoFisicaRepository =
                avaliacaoFisicaRepository;
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

    private StatusAvaliacaoComplementar obterOuCriar(
            AvaliacaoFisica avaliacaoFisica) {

        return statusRepository
                .findByAvaliacaoFisica_Id(
                        avaliacaoFisica.getId()
                )
                .orElseGet(() ->
                        new StatusAvaliacaoComplementar(
                                avaliacaoFisica
                        )
                );
    }

    private List<String> montarPendencias(
            boolean dorConcluida,
            boolean biomecanicaConcluida,
            boolean mobilidadeConcluida,
            boolean historicoLesoesRevisado) {

        List<String> pendencias = new ArrayList<>();

        if (!dorConcluida) {
            pendencias.add("AVALIACAO_DOR");
        }

        if (!biomecanicaConcluida) {
            pendencias.add("AVALIACAO_BIOMECANICA");
        }

        if (!mobilidadeConcluida) {
            pendencias.add("AVALIACAO_MOBILIDADE");
        }

        if (!historicoLesoesRevisado) {
            pendencias.add("HISTORICO_LESOES");
        }

        return List.copyOf(pendencias);
    }

    private StatusAvaliacaoComplementarResponse montarResponse(
            AvaliacaoFisica avaliacaoFisica,
            StatusAvaliacaoComplementar status) {

        boolean dorConcluida = status != null
                && status.isDorConcluida();

        boolean biomecanicaConcluida = status != null
                && status.isBiomecanicaConcluida();

        boolean mobilidadeConcluida = status != null
                && status.isMobilidadeConcluida();

        boolean historicoLesoesRevisado = status != null
                && status.isHistoricoLesoesRevisado();

        List<String> pendencias = montarPendencias(
                dorConcluida,
                biomecanicaConcluida,
                mobilidadeConcluida,
                historicoLesoesRevisado
        );

        return new StatusAvaliacaoComplementarResponse(
                avaliacaoFisica.getId(),
                avaliacaoFisica.getAluno().getId(),
                dorConcluida,
                biomecanicaConcluida,
                mobilidadeConcluida,
                historicoLesoesRevisado,
                pendencias.isEmpty(),
                pendencias,
                status == null
                        ? null
                        : status.getDataUltimaAtualizacao()
        );
    }

    @Transactional
    public void marcarDorConcluida(
            AvaliacaoFisica avaliacaoFisica) {

        StatusAvaliacaoComplementar status =
                obterOuCriar(avaliacaoFisica);

        status.setDorConcluida(true);

        statusRepository.save(status);
    }

    @Transactional
    public void marcarBiomecanicaConcluida(
            AvaliacaoFisica avaliacaoFisica) {

        StatusAvaliacaoComplementar status =
                obterOuCriar(avaliacaoFisica);

        status.setBiomecanicaConcluida(true);

        statusRepository.save(status);
    }

    @Transactional
    public void atualizarMobilidadeConcluida(
            AvaliacaoFisica avaliacaoFisica,
            boolean concluida) {

        StatusAvaliacaoComplementar status =
                obterOuCriar(avaliacaoFisica);

        status.setMobilidadeConcluida(concluida);

        statusRepository.save(status);
    }

    @Transactional
    public StatusAvaliacaoComplementarResponse
            marcarHistoricoLesoesRevisado(
                    Long professorUserId,
                    Long alunoId,
                    Long avaliacaoId) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        StatusAvaliacaoComplementar status =
                obterOuCriar(avaliacaoFisica);

        status.setHistoricoLesoesRevisado(true);

        StatusAvaliacaoComplementar statusSalvo =
                statusRepository.save(status);

        return montarResponse(
                avaliacaoFisica,
                statusSalvo
        );
    }

    @Transactional(readOnly = true)
    public StatusAvaliacaoComplementarResponse getStatus(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        AvaliacaoFisica avaliacaoFisica =
                findAvaliacaoDoProfessor(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        StatusAvaliacaoComplementar status =
                statusRepository
                        .findByAvaliacaoFisica_Id(
                                avaliacaoId
                        )
                        .orElse(null);

        return montarResponse(
                avaliacaoFisica,
                status
        );
    }
}