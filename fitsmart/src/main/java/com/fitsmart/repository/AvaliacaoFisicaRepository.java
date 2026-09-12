package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AvaliacaoFisica;

public interface AvaliacaoFisicaRepository
                extends JpaRepository<AvaliacaoFisica, Long> {

        List<AvaliacaoFisica> findAllByAluno_IdAndProfessor_User_IdOrderByDataAvaliacaoDesc(
                        Long alunoId,
                        Long professorUserId);

        Optional<AvaliacaoFisica> findByIdAndProfessor_User_Id(
                        Long avaliacaoId,
                        Long professorUserId);

        Optional<AvaliacaoFisica> findByIdAndAluno_IdAndProfessor_User_Id(
                        Long avaliacaoId,
                        Long alunoId,
                        Long professorUserId);

        List<AvaliacaoFisica>
        findAllByAluno_User_IdOrderByDataAvaliacaoDesc(
                Long alunoUserId
        );

        Optional<AvaliacaoFisica>
        findByIdAndAluno_User_Id(
                Long avaliacaoId,
                Long alunoUserId
        );
}