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

    // 1. Iniciar sessão
    public WorkoutSession startSession(Long workoutId, Long studentId) {
        WorkoutSession session = new WorkoutSession(workoutId, studentId, "EM_ANDAMENTO", LocalDateTime.now());
        return sessionRepository.save(session);
    }

    // 2. Finalizar sessão
    public WorkoutSession finishSession(Long sessionId) {
        WorkoutSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada com o ID: " + sessionId));
        
        session.setStatus("CONCLUIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    // 3. Interromper sessão
    public WorkoutSession interruptSession(Long sessionId) {
        WorkoutSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada com o ID: " + sessionId));
        
        session.setStatus("INTERROMPIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    // 4. Salvar Feedback
    public WorkoutFeedback saveFeedback(Long sessionId, FeedbackRequestDTO dto) {
        WorkoutFeedback feedback = new WorkoutFeedback(
                sessionId,
                dto.getNivelDor(),
                dto.getDificuldade(),
                dto.getComentarios()
        );
        return feedbackRepository.save(feedback);
    }
}   