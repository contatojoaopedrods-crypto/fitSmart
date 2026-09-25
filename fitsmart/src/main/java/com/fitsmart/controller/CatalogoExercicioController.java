package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.EquipamentoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.service.EquipamentoService;
import com.fitsmart.service.ExercicioService;

@RestController
@RequestMapping("/professors/me/catalog")
public class CatalogoExercicioController {

    private final EquipamentoService equipamentoService;
    private final ExercicioService exercicioService;

    public CatalogoExercicioController(
            EquipamentoService equipamentoService,
            ExercicioService exercicioService) {

        this.equipamentoService = equipamentoService;
        this.exercicioService = exercicioService;
    }

    @GetMapping("/equipment")
    public ResponseEntity<List<EquipamentoResponse>>
            listActiveEquipment() {

        return ResponseEntity.ok(
                equipamentoService.listAtivos()
        );
    }

    @GetMapping("/exercises")
    public ResponseEntity<List<ExercicioResponse>>
            listActiveExercises() {

        return ResponseEntity.ok(
                exercicioService.listAtivos()
        );
    }

    @GetMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExercicioResponse>
            getActiveExercise(
                    @PathVariable Long exerciseId) {

        return ResponseEntity.ok(
                exercicioService.getAtivo(exerciseId)
        );
    }
}