package com.fitsmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.Professor;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long>{
    
    boolean existsByCrefIgnoreCase(String cref);

    Optional<Professor> findByUser_Id(Long userId);
    
}
