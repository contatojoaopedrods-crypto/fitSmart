package com.fitsmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Exercicio;

public interface ExercicioRepository extends JpaRepository<Exercicio, Long> {
}