package com.fitsmart.controller;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/me")
public class StudentWorkoutController {

    @Autowired
    private WorkoutSessionService sessionService;

    
    private Long getAuthenticatedStudentId(Authentication authentication) {
        // Exemplo pegando o ID a partir do principal/username ou casting do usuario logado
        // Caso o seu projeto use um User customizado: ((User) authentication.getPrincipal()).getId()
        return Long.parseLong(authentication.getName()); 
    }

    
    @GetMapping("/workouts")
    public ResponseEntity<?> getMyWorkouts() {
        return ResponseEntity.ok("Lista de treinos do aluno");
    }

    
    @GetMapping("/workouts/{id}")
    public ResponseEntity<?> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok("Detalhes do treino ID: " + id);
    }

    
    @PostMapping("/workouts/{id}/sessions")
    public ResponseEntity<WorkoutSession> startSession(
            @PathVariable Long id,
            Authentication authentication) {
        Long studentId = getAuthenticatedStudentId(authentication);
        WorkoutSession session = sessionService.startSession(id, studentId);
        return ResponseEntity.ok(session);
    }

    
    @PatchMapping("/sessions/{sessionId}/finish")
    public ResponseEntity<WorkoutSession> finishSession(@PathVariable Long sessionId) {
        WorkoutSession session = sessionService.finishSession(sessionId);
        return ResponseEntity.ok(session);
    }

    
    @PatchMapping("/sessions/{sessionId}/interrupt")
    public ResponseEntity<WorkoutSession> interruptSession(@PathVariable Long sessionId) {
        WorkoutSession session = sessionService.interruptSession(sessionId);
        return ResponseEntity.ok(session);
    }

    
    @PostMapping("/sessions/{sessionId}/feedback")
    public ResponseEntity<WorkoutFeedback> sendFeedback(
            @PathVariable Long sessionId,
            @RequestBody FeedbackRequestDTO feedbackDTO) {
        WorkoutFeedback feedback = sessionService.saveFeedback(sessionId, feedbackDTO);
        return ResponseEntity.ok(feedback);
    }
}