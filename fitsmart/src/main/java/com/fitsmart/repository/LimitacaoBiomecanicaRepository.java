package com.fitsmart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.LimitacaoBiomecanica;

public interface LimitacaoBiomecanicaRepository
        extends JpaRepository<LimitacaoBiomecanica, Long> {

    Optional<LimitacaoBiomecanica> findByIdAndAtivaTrue(Long id);
}