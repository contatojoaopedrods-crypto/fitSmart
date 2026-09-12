package com.fitsmart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AvaliacaoBiomecanica;

public interface AvaliacaoBiomecanicaRepository
        extends JpaRepository<AvaliacaoBiomecanica, Long> {

    List<AvaliacaoBiomecanica>
            findAllByAvaliacaoFisica_IdOrderByIdAsc(
                    Long avaliacaoFisicaId
            );

    void deleteAllByAvaliacaoFisica_Id(
            Long avaliacaoFisicaId
    );
}