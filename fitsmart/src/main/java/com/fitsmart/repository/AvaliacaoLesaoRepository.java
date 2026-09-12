package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AvaliacaoLesao;

public interface AvaliacaoLesaoRepository
        extends JpaRepository<AvaliacaoLesao, Long> {

    List<AvaliacaoLesao>
            findAllByAluno_IdAndProfessor_User_IdOrderByDataAvaliacaoDescIdDesc(
                    Long alunoId,
                    Long professorUserId
            );

    Optional<AvaliacaoLesao>
            findByIdAndAluno_IdAndProfessor_User_Id(
                    Long avaliacaoLesaoId,
                    Long alunoId,
                    Long professorUserId
            );
}