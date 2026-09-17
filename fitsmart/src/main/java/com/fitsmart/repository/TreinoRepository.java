package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Treino;

public interface TreinoRepository extends JpaRepository<Treino, Long> {

    // Busca todos os treinos de um aluno associado a um professor específico
    List<Treino> findAllByAluno_IdAndProfessor_User_IdOrderByDataCriacaoDesc(
            Long alunoId,
            Long professorUserId
    );

    // Busca um treino específico validando o aluno e o professor responsável
    Optional<Treino> findByIdAndAluno_IdAndProfessor_User_Id(
            Long treinoId,
            Long alunoId,
            Long professorUserId
    );
}