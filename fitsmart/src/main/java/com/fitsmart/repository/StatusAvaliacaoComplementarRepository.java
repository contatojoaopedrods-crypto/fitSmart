package com.fitsmart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.StatusAvaliacaoComplementar;

public interface StatusAvaliacaoComplementarRepository
        extends JpaRepository<StatusAvaliacaoComplementar, Long> {

    Optional<StatusAvaliacaoComplementar>
            findByAvaliacaoFisica_Id(
                    Long avaliacaoFisicaId
            );
}
