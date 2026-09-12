package com.fitsmart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Lesao;

public interface LesaoRepository
        extends JpaRepository<Lesao, Long> {

    Optional<Lesao> findByIdAndAtivaTrue(Long id);
}