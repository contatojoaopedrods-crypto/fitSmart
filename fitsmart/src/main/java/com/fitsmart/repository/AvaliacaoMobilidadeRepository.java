package com.fitsmart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AvaliacaoMobilidade;

public interface AvaliacaoMobilidadeRepository
        extends JpaRepository<AvaliacaoMobilidade, Long> {

    Optional<AvaliacaoMobilidade>
            findByAvaliacaoFisica_Id(
                    Long avaliacaoFisicaId
            );
}