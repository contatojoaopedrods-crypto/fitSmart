package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoLesaoResponse;
import com.fitsmart.dto.CreateAvaliacaoLesaoRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Aluno;
import com.fitsmart.model.AvaliacaoLesao;
import com.fitsmart.model.Lesao;
import com.fitsmart.repository.AlunoRepository;
import com.fitsmart.repository.AvaliacaoLesaoRepository;
import com.fitsmart.repository.LesaoRepository;

@Service
public class AvaliacaoLesaoService {

    private final AvaliacaoLesaoRepository avaliacaoLesaoRepository;
    private final AlunoRepository alunoRepository;
    private final LesaoRepository lesaoRepository;

    public AvaliacaoLesaoService(
            AvaliacaoLesaoRepository avaliacaoLesaoRepository,
            AlunoRepository alunoRepository,
            LesaoRepository lesaoRepository) {

        this.avaliacaoLesaoRepository = avaliacaoLesaoRepository;
        this.alunoRepository = alunoRepository;
        this.lesaoRepository = lesaoRepository;
    }

    private Aluno findAlunoDoProfessor(
            Long alunoId,
            Long professorUserId) {

        return alunoRepository
                .findByIdAndProfessor_User_Id(
                        alunoId,
                        professorUserId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Aluno não encontrado"
                        )
                );
    }

    private Lesao findLesao(Long lesaoId) {

        return lesaoRepository
                .findByIdAndAtivaTrue(lesaoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lesão não encontrada"
                        )
                );
    }

    private AvaliacaoLesaoResponse convertToResponse(
            AvaliacaoLesao avaliacao) {

        return new AvaliacaoLesaoResponse(
                avaliacao.getId(),
                avaliacao.getAluno().getId(),
                avaliacao.getProfessor().getId(),
                avaliacao.getLesao().getId(),
                avaliacao.getLesao().getNomeLesao(),
                avaliacao.getLesao().getArticulacao(),
                avaliacao.getLateralidade(),
                avaliacao.getStatusLesao(),
                avaliacao.getGravidade(),
                avaliacao.getDataAvaliacao(),
                avaliacao.getDataInicio(),
                avaliacao.isLiberacaoMedica(),
                avaliacao.isDorAtualmente(),
                avaliacao.getObservacoes()
        );
    }

    @Transactional
    public AvaliacaoLesaoResponse createAvaliacao(
            Long professorUserId,
            Long alunoId,
            CreateAvaliacaoLesaoRequest request) {

        Aluno aluno = findAlunoDoProfessor(
                alunoId,
                professorUserId
        );

        Lesao lesao = findLesao(request.lesaoId());

        AvaliacaoLesao avaliacao = new AvaliacaoLesao();

        avaliacao.setAluno(aluno);
        avaliacao.setProfessor(aluno.getProfessor());
        avaliacao.setLesao(lesao);
        avaliacao.setLateralidade(request.lateralidade());
        avaliacao.setStatusLesao(request.statusLesao());
        avaliacao.setGravidade(request.gravidade());
        avaliacao.setDataInicio(request.dataInicio());
        avaliacao.setLiberacaoMedica(
                request.liberacaoMedica()
        );
        avaliacao.setDorAtualmente(
                request.dorAtualmente()
        );
        avaliacao.setObservacoes(request.observacoes());

        AvaliacaoLesao avaliacaoSalva =
                avaliacaoLesaoRepository.save(avaliacao);

        return convertToResponse(avaliacaoSalva);
    }

    @Transactional(readOnly = true)
    public List<AvaliacaoLesaoResponse> listAvaliacoes(
            Long professorUserId,
            Long alunoId) {

        findAlunoDoProfessor(alunoId, professorUserId);

        return avaliacaoLesaoRepository
                .findAllByAluno_IdAndProfessor_User_IdOrderByDataAvaliacaoDescIdDesc(
                        alunoId,
                        professorUserId
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AvaliacaoLesaoResponse getAvaliacao(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoLesaoId) {

        AvaliacaoLesao avaliacao =
                avaliacaoLesaoRepository
                        .findByIdAndAluno_IdAndProfessor_User_Id(
                                avaliacaoLesaoId,
                                alunoId,
                                professorUserId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Avaliação de lesão não encontrada"
                                )
                        );

        return convertToResponse(avaliacao);
    }
}