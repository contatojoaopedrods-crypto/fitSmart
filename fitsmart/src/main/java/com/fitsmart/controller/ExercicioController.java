package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.service.ExercicioService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/exercises")
public class ExercicioController {

    private final ExercicioService exercicioService;

    public ExercicioController(ExercicioService exercicioService) {
        this.exercicioService = exercicioService;
    }

    // GET /exercises
    @GetMapping
    public ResponseEntity<List<ExercicioResponse>> listarTodos() {
        return ResponseEntity.ok(exercicioService.listAll());
    }

    // GET /exercises/{exerciseId}
    @GetMapping("/{exerciseId}")
    public ResponseEntity<ExercicioResponse> buscarPorId(@PathVariable Long exerciseId) {
        return ResponseEntity.ok(exercicioService.getAtivo(exerciseId));
    }
}