package com.fitsmart.repository;

import com.fitsmart.model.WorkoutFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutFeedbackRepository extends JpaRepository<WorkoutFeedback, Long> {
    Optional<WorkoutFeedback> findBySessionId(Long sessionId);
}