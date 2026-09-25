package com.fitsmart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Equipamento;

public interface EquipamentoRepository
        extends JpaRepository<Equipamento, Long> {

    List<Equipamento> findAllByOrderByNomeAsc();

    List<Equipamento> findAllByAtivoTrueOrderByNomeAsc();

    Optional<Equipamento> findByIdAndAtivoTrue(
            Long equipamentoId
    );
}