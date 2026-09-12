package com.fitsmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.AcaoArticular;

public interface AcaoArticularRepository
        extends JpaRepository<AcaoArticular, Long> {
}