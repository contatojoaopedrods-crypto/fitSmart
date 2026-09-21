package com.fitsmart.controller;

import com.fitsmart.dto.FeedbackRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/me")
public class StudentWorkoutController {

   
    @GetMapping("/workouts")
    public ResponseEntity<?> getMyWorkouts() {
        return ResponseEntity.ok("Lista de treinos publicados do aluno");
    }

    
    @GetMapping("/workouts/{id}")
    public ResponseEntity<?> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok("Detalhes do treino ID: " + id);
    }

    
    @PostMapping("/workouts/{id}/sessions")
    public ResponseEntity<?> startSession(@PathVariable Long id) {
        return ResponseEntity.ok("Sessão iniciada para o treino ID: " + id);
    }

    
    @PatchMapping("/sessions/{sessionId}/finish")
    public ResponseEntity<?> finishSession(@PathVariable Long sessionId) {
        return ResponseEntity.ok("Sessão ID " + sessionId + " finalizada com sucesso");
    }

    
    @PatchMapping("/sessions/{sessionId}/interrupt")
    public ResponseEntity<?> interruptSession(@PathVariable Long sessionId) {
        return ResponseEntity.ok("Sessão ID " + sessionId + " interrompida");
    }

    
    @PostMapping("/sessions/{sessionId}/feedback")
    public ResponseEntity<?> sendFeedback(
            @PathVariable Long sessionId,
            @RequestBody FeedbackRequestDTO feedbackDTO) {
        return ResponseEntity.ok("Feedback recebido com sucesso para a sessão ID: " + sessionId);
    }
}