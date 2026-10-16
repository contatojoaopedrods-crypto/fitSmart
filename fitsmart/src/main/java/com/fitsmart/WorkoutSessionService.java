package com.fitsmart.service;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.repository.WorkoutFeedbackRepository;
import com.fitsmart.repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WorkoutSessionService {

    @Autowired
    private WorkoutSessionRepository sessionRepository;

    @Autowired
    private WorkoutFeedbackRepository feedbackRepository;

    
    private WorkoutSession validateSessionOwner(Long sessionId, Long studentId) {
        WorkoutSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada com o ID: " + sessionId));

        if (!session.getStudentId().equals(studentId)) {
            throw new RuntimeException("Acesso negado: Esta sessão não pertence ao aluno autenticado.");
        }
        return session;
    }

    
    public WorkoutSession startSession(Long workoutId, Long studentId) {
        WorkoutSession session = new WorkoutSession(workoutId, studentId, "EM_ANDAMENTO", LocalDateTime.now());
        return sessionRepository.save(session);
    }

    
    public WorkoutSession finishSession(Long sessionId, Long studentId) {
        WorkoutSession session = validateSessionOwner(sessionId, studentId);
        session.setStatus("CONCLUIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    
    public WorkoutSession interruptSession(Long sessionId, Long studentId) {
        WorkoutSession session = validateSessionOwner(sessionId, studentId);
        session.setStatus("INTERROMPIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    
    public WorkoutFeedback saveFeedback(Long sessionId, Long studentId, FeedbackRequestDTO dto) {
        validateSessionOwner(sessionId, studentId);
        WorkoutFeedback feedback = new WorkoutFeedback(
                sessionId,
                dto.getNivelDor(),
                dto.getDificuldade(),
                dto.getComentarios()
        );
        return feedbackRepository.save(feedback);
    }
}