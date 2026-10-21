package com.fitsmart.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Treino;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.model.enums.StatusTreino;
import com.fitsmart.repository.TreinoRepository;
import com.fitsmart.repository.WorkoutFeedbackRepository;
import com.fitsmart.repository.WorkoutSessionRepository;

@Service
public class WorkoutSessionService {

    private final WorkoutSessionRepository sessionRepository;
    private final WorkoutFeedbackRepository feedbackRepository;
    private final TreinoRepository treinoRepository;

    public WorkoutSessionService(
            WorkoutSessionRepository sessionRepository,
            WorkoutFeedbackRepository feedbackRepository,
            TreinoRepository treinoRepository) {
        this.sessionRepository = sessionRepository;
        this.feedbackRepository = feedbackRepository;
        this.treinoRepository = treinoRepository;
    }

    private WorkoutSession validateSessionOwner(Long sessionId, Long studentId) {
        WorkoutSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Sessão não encontrada com o ID: " + sessionId));

        if (!session.getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("Acesso negado: Esta sessão não pertence ao aluno autenticado.");
        }
        return session;
    }

    @Transactional
    public WorkoutSession startSession(Long workoutId, Long studentId) {
        Treino treino = treinoRepository.findById(workoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Treino não encontrado com o ID: " + workoutId));

        // Valida se o treino está publicado/ativo para o aluno
        if (treino.getStatus() != StatusTreino.ATIVO && treino.getStatus() != StatusTreino.PUBLICADO) {
            throw new IllegalStateException("Não é possível iniciar este treino pois ele ainda não foi publicado pelo professor.");
        }

        WorkoutSession session = new WorkoutSession(workoutId, studentId, "EM_ANDAMENTO", LocalDateTime.now());
        return sessionRepository.save(session);
    }

    @Transactional
    public WorkoutSession finishSession(Long sessionId, Long studentId) {
        WorkoutSession session = validateSessionOwner(sessionId, studentId);
        session.setStatus("CONCLUIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    @Transactional
    public WorkoutSession interruptSession(Long sessionId, Long studentId) {
        WorkoutSession session = validateSessionOwner(sessionId, studentId);
        session.setStatus("INTERROMPIDO");
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    @Transactional
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