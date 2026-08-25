package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
    boolean existsByUser_id(Long userId);

    Optional<Aluno> findByUser_Id(Long user_Id);

    List<Aluno> findAllByProfessor_User_Id(Long professorUserId);

    Optional<Aluno> findByIdAndProfessor_User_Id(
        Long alunoId,
        Long professorUserId
    );
}
