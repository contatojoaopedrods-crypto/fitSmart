package com.fitsmart.service;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.model.Workout; // Certifique-se de que o import da entidade de treino está correto
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.repository.WorkoutFeedbackRepository;
import com.fitsmart.repository.WorkoutRepository; // 1. Import do repositório de treino
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

    @Autowired
    private WorkoutRepository workoutRepository; // 2. Injeção do WorkoutRepository

    private WorkoutSession validateSessionOwner(Long sessionId, Long studentId) {
        WorkoutSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada com o ID: " + sessionId));

        if (!session.getStudentId().equals(studentId)) {
            throw new RuntimeException("Acesso negado: Esta sessão não pertence ao aluno autenticado.");
        }
        return session;
    }

    public WorkoutSession startSession(Long workoutId, Long studentId) {
        // 3. Busca o treino para garantir que ele existe
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado com o ID: " + workoutId));

        // 4. Validação: Verifica se o treino foi aprovado/publicado pelo professor
        // (Nota: se o seu atributo se chamar diferente na entidade Workout, como getStatus(), ajuste esta linha)
        if (!workout.isPublished()) {
            throw new RuntimeException("Não é possível iniciar este treino pois ele ainda não foi publicado ou aprovado pelo professor.");
        }

        // 5. Se passou na validação, cria e salva a sessão
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