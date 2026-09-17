package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AtualizarTreinoDTO;
import com.fitsmart.dto.CriarTreinoDTO;
import com.fitsmart.dto.TreinoResponseDTO;
import com.fitsmart.service.TreinoService;

@RestController
@RequestMapping("/professors/me/students/{studentId}/workouts")
public class TreinoController {

    private final TreinoService treinoService;

    public TreinoController(TreinoService treinoService) {
        this.treinoService = treinoService;
    }

    /**
     * Método auxiliar para obter o ID de usuário do professor autenticado.
     * Na integração com Spring Security/JWT, este valor será extraído do SecurityContext.
     */
    private Long obterProfessorUserId() {
        return 1L; // ID fixo para ambiente de dev/teste local
    }

    // POST /professors/me/students/{studentId}/workouts
    @PostMapping
    public ResponseEntity<TreinoResponseDTO> criarRascunho(
            @PathVariable Long studentId,
            @RequestBody CriarTreinoDTO dto) {
        Long professorUserId = obterProfessorUserId();
        TreinoResponseDTO response = treinoService.criarRascunho(professorUserId, studentId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /professors/me/students/{studentId}/workouts
    @GetMapping
    public ResponseEntity<List<TreinoResponseDTO>> listarTreinosDoAluno(@PathVariable Long studentId) {
        Long professorUserId = obterProfessorUserId();
        return ResponseEntity.ok(treinoService.listarTreinosDoAluno(professorUserId, studentId));
    }

    // GET /professors/me/students/{studentId}/workouts/{workoutId}
    @GetMapping("/{workoutId}")
    public ResponseEntity<TreinoResponseDTO> buscarTreinoPorId(
            @PathVariable Long studentId,
            @PathVariable Long workoutId) {
        Long professorUserId = obterProfessorUserId();
        return ResponseEntity.ok(treinoService.buscarTreinoPorId(professorUserId, studentId, workoutId));
    }

    // PUT /professors/me/students/{studentId}/workouts/{workoutId}
    @PutMapping("/{workoutId}")
    public ResponseEntity<TreinoResponseDTO> atualizarTreino(
            @PathVariable Long studentId,
            @PathVariable Long workoutId,
            @RequestBody AtualizarTreinoDTO dto) {
        Long professorUserId = obterProfessorUserId();
        return ResponseEntity.ok(treinoService.atualizarTreino(professorUserId, studentId, workoutId, dto));
    }

    // POST /professors/me/students/{studentId}/workouts/{workoutId}/publish
    @PostMapping("/{workoutId}/publish")
    public ResponseEntity<TreinoResponseDTO> publicarTreino(
            @PathVariable Long studentId,
            @PathVariable Long workoutId) {
        Long professorUserId = obterProfessorUserId();
        return ResponseEntity.ok(treinoService.publicarTreino(professorUserId, studentId, workoutId));
    }
}
