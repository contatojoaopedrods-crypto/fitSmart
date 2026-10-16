package com.fitsmart.controller;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/me")
@PreAuthorize("hasRole('ALUNO')")
public class StudentWorkoutController {

    @Autowired
    private WorkoutSessionService sessionService;

    private Long getAuthenticatedStudentId(Authentication authentication) {
        return Long.parseLong(authentication.getName());
    }

    // 1. Listar treinos do aluno
    @GetMapping("/workouts")
    public ResponseEntity<?> getMyWorkouts() {
        return ResponseEntity.ok("Lista de treinos do aluno");
    }

    // 2. Ver detalhes do treino
    @GetMapping("/workouts/{id}")
    public ResponseEntity<?> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok("Detalhes do treino ID: " + id);
    }

    // 3. Iniciar sessão de treino
    @PostMapping("/workouts/{id}/sessions")
    public ResponseEntity<WorkoutSession> startSession(
            @PathVariable Long id,
            Authentication authentication) {
        Long studentId = getAuthenticatedStudentId(authentication);
        WorkoutSession session = sessionService.startSession(id, studentId);
        return ResponseEntity.ok(session);
    }

    // 4. Finalizar sessão
    @PatchMapping("/sessions/{sessionId}/finish")
    public ResponseEntity<WorkoutSession> finishSession(
            @PathVariable Long sessionId,
            Authentication authentication) {
        Long studentId = getAuthenticatedStudentId(authentication);
        WorkoutSession session = sessionService.finishSession(sessionId, studentId);
        return ResponseEntity.ok(session);
    }

    // 5. Interromper sessão
    @PatchMapping("/sessions/{sessionId}/interrupt")
    public ResponseEntity<WorkoutSession> interruptSession(
            @PathVariable Long sessionId,
            Authentication authentication) {
        Long studentId = getAuthenticatedStudentId(authentication);
        WorkoutSession session = sessionService.interruptSession(sessionId, studentId);
        return ResponseEntity.ok(session);
    }

    // 6. Enviar Feedback
    @PostMapping("/sessions/{sessionId}/feedback")
    public ResponseEntity<WorkoutFeedback> sendFeedback(
            @PathVariable Long sessionId,
            @RequestBody FeedbackRequestDTO feedbackDTO,
            Authentication authentication) {
        Long studentId = getAuthenticatedStudentId(authentication);
        WorkoutFeedback feedback = sessionService.saveFeedback(sessionId, studentId, feedbackDTO);
        return ResponseEntity.ok(feedback);
    }
}