package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.ExercicioResponseDTO;
import com.fitsmart.service.ExercicioService;

@RestController
@RequestMapping("/exercises")
public class ExercicioController {

    private final ExercicioService exercicioService;

    public ExercicioController(ExercicioService exercicioService) {
        this.exercicioService = exercicioService;
    }

    // GET /exercises
    @GetMapping
    public ResponseEntity<List<ExercicioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(exercicioService.listarTodos());
    }

    // GET /exercises/{exerciseId}
    @GetMapping("/{exerciseId}")
    public ResponseEntity<ExercicioResponseDTO> buscarPorId(@PathVariable Long exerciseId) {
        return ResponseEntity.ok(exercicioService.buscarPorId(exerciseId));
    }
}