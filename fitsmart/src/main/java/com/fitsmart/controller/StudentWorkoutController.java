package com.fitsmart.controller;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/me")
public class StudentWorkoutController {

    @Autowired
    private WorkoutSessionService sessionService;

    // 1. Listar treinos do aluno (placeholder)
    @GetMapping("/workouts")
    public ResponseEntity<?> getMyWorkouts() {
        return ResponseEntity.ok("Lista de treinos do aluno");
    }

    // 2. Ver detalhes do treino (placeholder)
    @GetMapping("/workouts/{id}")
    public ResponseEntity<?> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok("Detalhes do treino ID: " + id);
    }

    // 3. Iniciar sessão de treino
    @PostMapping("/workouts/{id}/sessions")
    public ResponseEntity<WorkoutSession> startSession(@PathVariable Long id) {
        // Exemplo fixo com aluno ID 1 para testes
        WorkoutSession session = sessionService.startSession(id, 1L);
        return ResponseEntity.ok(session);
    }

    // 4. Finalizar sessão
    @PatchMapping("/sessions/{sessionId}/finish")
    public ResponseEntity<WorkoutSession> finishSession(@PathVariable Long sessionId) {
        WorkoutSession session = sessionService.finishSession(sessionId);
        return ResponseEntity.ok(session);
    }

    // 5. Interromper sessão
    @PatchMapping("/sessions/{sessionId}/interrupt")
    public ResponseEntity<WorkoutSession> interruptSession(@PathVariable Long sessionId) {
        WorkoutSession session = sessionService.interruptSession(sessionId);
        return ResponseEntity.ok(session);
    }

    // 6. Enviar Feedback
    @PostMapping("/sessions/{sessionId}/feedback")
    public ResponseEntity<WorkoutFeedback> sendFeedback(
            @PathVariable Long sessionId,
            @RequestBody FeedbackRequestDTO feedbackDTO) {
        WorkoutFeedback feedback = sessionService.saveFeedback(sessionId, feedbackDTO);
        return ResponseEntity.ok(feedback);
    }
}