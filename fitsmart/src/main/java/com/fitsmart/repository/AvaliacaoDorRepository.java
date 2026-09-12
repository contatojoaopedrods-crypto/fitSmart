package com.fitsmart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AvaliacaoDor;

public interface AvaliacaoDorRepository
        extends JpaRepository<AvaliacaoDor, Long> {

    List<AvaliacaoDor>
            findAllByAvaliacaoFisica_IdOrderByIdAsc(
                    Long avaliacaoFisicaId
            );

    void deleteAllByAvaliacaoFisica_Id(
            Long avaliacaoFisicaId
    );
}