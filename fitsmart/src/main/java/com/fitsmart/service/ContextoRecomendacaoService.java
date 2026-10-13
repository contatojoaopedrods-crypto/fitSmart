package com.fitsmart.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoCompletaResponse;
import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.dto.AvaliacaoMobilidadeResponse;
import com.fitsmart.dto.StatusAvaliacaoComplementarResponse;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Aluno;
import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.repository.AlunoRepository;

@Service
public class ContextoRecomendacaoService {

    private final AlunoRepository alunoRepository;

    private final AvaliacaoFisicaService avaliacaoFisicaService;

    private final StatusAvaliacaoComplementarService statusService;

    private final AvaliacaoCompletaService avaliacaoCompletaService;

    public ContextoRecomendacaoService(
            AlunoRepository alunoRepository,
            AvaliacaoFisicaService avaliacaoFisicaService,
            StatusAvaliacaoComplementarService statusService,
            AvaliacaoCompletaService avaliacaoCompletaService) {

        this.alunoRepository = alunoRepository;
        this.avaliacaoFisicaService = avaliacaoFisicaService;
        this.statusService = statusService;
        this.avaliacaoCompletaService = avaliacaoCompletaService;
    }

    @Transactional(readOnly = true)
    public ContextoRecomendacao preparar(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        Aluno aluno = alunoRepository
                .findByIdAndProfessor_User_Id(
                        alunoId,
                        professorUserId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Aluno não encontrado"
                        )
                );

        AvaliacaoFisicaResponse avaliacaoFisica =
                avaliacaoFisicaService.getAvaliacao(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        StatusAvaliacaoComplementarResponse status =
                statusService.getStatus(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        List<String> motivosBloqueio = new ArrayList<>();

        if (!avaliacaoFisica.apto()) {
            motivosBloqueio.add(
                    "A avaliação física registra o aluno como não apto."
            );
        }

        if (avaliacaoFisica.objetivo() == null) {
            motivosBloqueio.add(
                    "O objetivo do aluno não foi informado na avaliação."
            );
        }

        if (aluno.getNivelExperiencia() == null) {
            motivosBloqueio.add(
                    "O nível de experiência do aluno não foi informado."
            );
        }

        if (!status.completo()) {
            motivosBloqueio.add(
                    "A avaliação possui pendências: "
                    + String.join(", ", status.pendencias())
            );
        }

        /*
         * Não busca os dados complementares enquanto
         * houver pendências ou outro motivo de bloqueio.
         */
        if (!motivosBloqueio.isEmpty()) {
            return new ContextoRecomendacao(
                    avaliacaoFisica,
                    aluno.getNivelExperiencia(),
                    true,
                    List.copyOf(motivosBloqueio),
                    null
            );
        }

        AvaliacaoCompletaResponse avaliacaoCompleta =
                avaliacaoCompletaService.getAvaliacaoCompleta(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        /*
         * Confere os dados de mobilidade, além do indicador
         * de conclusão, para evitar pontuar dados incompletos.
         */
        if (!possuiMobilidadeCompleta(
                avaliacaoCompleta.avaliacaoMobilidade())) {

            motivosBloqueio.add(
                    "Existem articulações sem avaliação de mobilidade."
            );
        }

        boolean geracaoBloqueada =
                !motivosBloqueio.isEmpty();

        return new ContextoRecomendacao(
                avaliacaoFisica,
                aluno.getNivelExperiencia(),
                geracaoBloqueada,
                List.copyOf(motivosBloqueio),
                geracaoBloqueada ? null : avaliacaoCompleta
        );
    }

    private boolean possuiMobilidadeCompleta(
            AvaliacaoMobilidadeResponse mobilidade) {

        return mobilidade != null
                && mobilidade.cervical() != null
                && mobilidade.ombro() != null
                && mobilidade.cotovelo() != null
                && mobilidade.punho() != null
                && mobilidade.toracica() != null
                && mobilidade.lombar() != null
                && mobilidade.quadril() != null
                && mobilidade.joelho() != null
                && mobilidade.tornozelo() != null;
    }

    public record ContextoRecomendacao(

            AvaliacaoFisicaResponse avaliacaoFisica,

            NivelExperiencia nivelExperienciaAluno,

            boolean geracaoBloqueada,

            List<String> motivosBloqueio,

            AvaliacaoCompletaResponse avaliacaoCompleta

    ) {
    }
}