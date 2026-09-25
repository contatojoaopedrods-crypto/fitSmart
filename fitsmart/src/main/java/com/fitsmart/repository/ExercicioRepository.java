package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Exercicio;

public interface ExercicioRepository
        extends JpaRepository<Exercicio, Long> {

    List<Exercicio> findAllByOrderByNomeAsc();

    List<Exercicio> findAllByAtivoTrueOrderByNomeAsc();

    Optional<Exercicio> findByIdAndAtivoTrue(
            Long exercicioId
    );
}