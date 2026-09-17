package com.fitsmart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.ExercicioResponseDTO;
import com.fitsmart.model.Exercicio;
import com.fitsmart.repository.ExercicioRepository;

@Service
public class ExercicioService {

    private final ExercicioRepository exercicioRepository;

    public ExercicioService(ExercicioRepository exercicioRepository) {
        this.exercicioRepository = exercicioRepository;
    }

    @Transactional(readOnly = true)
    public List<ExercicioResponseDTO> listarTodos() {
        return exercicioRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExercicioResponseDTO buscarPorId(Long id) {
        Exercicio exercicio = exercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercício não encontrado com ID: " + id));
        return converterParaDTO(exercicio);
    }

    private ExercicioResponseDTO converterParaDTO(Exercicio exercicio) {
        ExercicioResponseDTO dto = new ExercicioResponseDTO();
        dto.setId(exercicio.getId());
        dto.setNome(exercicio.getNome());
        dto.setDescricao(exercicio.getDescricao());
        dto.setDificuldade(exercicio.getDificuldade());
        dto.setImpacto(exercicio.getImpacto());
        dto.setObjetivo(exercicio.getObjetivo());

        dto.setAcoesArticulares(
            exercicio.getAcoesArticulares().stream()
                .map(acao -> acao.toString())
                .collect(Collectors.toList())
        );

        dto.setRestricoesLimitacoes(
            exercicio.getRestricoesLimitacoes().stream()
                .map(lim -> lim.toString())
                .collect(Collectors.toList())
        );

        dto.setRestricoesLesoes(
            exercicio.getRestricoesLesoes().stream()
                .map(lesao -> lesao.toString())
                .collect(Collectors.toList())
        );

        return dto;
    }
}