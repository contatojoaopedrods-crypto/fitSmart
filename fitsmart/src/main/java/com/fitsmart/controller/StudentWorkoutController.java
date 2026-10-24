package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.FeedbackRequestDTO;
import com.fitsmart.dto.TreinoResponseDTO;
import com.fitsmart.model.WorkoutFeedback;
import com.fitsmart.model.WorkoutSession;
import com.fitsmart.security.JwtUtils;
import com.fitsmart.service.TreinoService;
import com.fitsmart.service.WorkoutSessionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students/me")
@PreAuthorize("hasRole('ALUNO')")
public class StudentWorkoutController {

    private final WorkoutSessionService sessionService;
    private final TreinoService treinoService;

    public StudentWorkoutController(WorkoutSessionService sessionService, TreinoService treinoService) {
        this.sessionService = sessionService;
        this.treinoService = treinoService;
    }

    private Long getAuthenticatedStudentUserId(Jwt jwt) {
        return JwtUtils.getUserId(jwt);
    }

    // 1. Listar treinos do aluno autenticado
    @GetMapping("/workouts")
    public ResponseEntity<List<TreinoResponseDTO>> getWorkouts(@AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        List<TreinoResponseDTO> treinos = treinoService.listarTreinosDoAluno(studentUserId, studentUserId);
        return ResponseEntity.ok(treinos);
    }

    // 2. Ver detalhes de um treino específico do aluno
    @GetMapping("/workouts/{id}")
    public ResponseEntity<TreinoResponseDTO> getWorkoutById(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        TreinoResponseDTO treino = treinoService.buscarTreinoPorId(studentUserId, id, id);
        return ResponseEntity.ok(treino);
    }

    // 3. Iniciar sessão de treino
    @PostMapping("/workouts/{id}/sessions")
    public ResponseEntity<WorkoutSession> startSession(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        WorkoutSession session = sessionService.startSession(id, studentUserId);
        return ResponseEntity.ok(session);
    }

    // 4. Finalizar sessão
    @PatchMapping("/sessions/{sessionId}/finish")
    public ResponseEntity<WorkoutSession> finishSession(
            @PathVariable Long sessionId,
            @AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        WorkoutSession session = sessionService.finishSession(sessionId, studentUserId);
        return ResponseEntity.ok(session);
    }

    // 5. Interromper sessão
    @PatchMapping("/sessions/{sessionId}/interrupt")
    public ResponseEntity<WorkoutSession> interruptSession(
            @PathVariable Long sessionId,
            @AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        WorkoutSession session = sessionService.interruptSession(sessionId, studentUserId);
        return ResponseEntity.ok(session);
    }

    // 6. Enviar Feedback
    @PostMapping("/sessions/{sessionId}/feedback")
    public ResponseEntity<WorkoutFeedback> sendFeedback(
            @PathVariable Long sessionId,
            @Valid @RequestBody FeedbackRequestDTO feedbackDTO,
            @AuthenticationPrincipal Jwt jwt) {
        Long studentUserId = getAuthenticatedStudentUserId(jwt);
        WorkoutFeedback feedback = sessionService.saveFeedback(sessionId, studentUserId, feedbackDTO);
        return ResponseEntity.ok(feedback);
    }
}