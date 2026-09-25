package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AtualizarStatusRequest;
import com.fitsmart.dto.EquipamentoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.SalvarEquipamentoRequest;
import com.fitsmart.dto.SalvarExercicioRequest;
import com.fitsmart.service.EquipamentoService;
import com.fitsmart.service.ExercicioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin/catalog")
public class AdminCatalogoController {

    private final EquipamentoService equipamentoService;
    private final ExercicioService exercicioService;

    public AdminCatalogoController(
            EquipamentoService equipamentoService,
            ExercicioService exercicioService) {

        this.equipamentoService = equipamentoService;
        this.exercicioService = exercicioService;
    }

    @PostMapping("/equipment")
    public ResponseEntity<EquipamentoResponse>
            createEquipment(
                    @Valid @RequestBody
                    SalvarEquipamentoRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        equipamentoService
                                .createEquipamento(request)
                );
    }

    @GetMapping("/equipment")
    public ResponseEntity<List<EquipamentoResponse>>
            listEquipment() {

        return ResponseEntity.ok(
                equipamentoService.listAll()
        );
    }

    @PutMapping("/equipment/{equipmentId}")
    public ResponseEntity<EquipamentoResponse>
            updateEquipment(
                    @PathVariable Long equipmentId,
                    @Valid @RequestBody
                    SalvarEquipamentoRequest request) {

        return ResponseEntity.ok(
                equipamentoService.updateEquipamento(
                        equipmentId,
                        request
                )
        );
    }

    @PatchMapping("/equipment/{equipmentId}/status")
    public ResponseEntity<EquipamentoResponse>
            updateEquipmentStatus(
                    @PathVariable Long equipmentId,
                    @Valid @RequestBody
                    AtualizarStatusRequest request) {

        return ResponseEntity.ok(
                equipamentoService.updateStatus(
                        equipmentId,
                        request.ativo()
                )
        );
    }

    @PostMapping("/exercises")
    public ResponseEntity<ExercicioResponse>
            createExercise(
                    @Valid @RequestBody
                    SalvarExercicioRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        exercicioService
                                .createExercicio(request)
                );
    }

    @GetMapping("/exercises")
    public ResponseEntity<List<ExercicioResponse>>
            listExercises() {

        return ResponseEntity.ok(
                exercicioService.listAll()
        );
    }

    @PutMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExercicioResponse>
            updateExercise(
                    @PathVariable Long exerciseId,
                    @Valid @RequestBody
                    SalvarExercicioRequest request) {

        return ResponseEntity.ok(
                exercicioService.updateExercicio(
                        exerciseId,
                        request
                )
        );
    }

    @PatchMapping("/exercises/{exerciseId}/status")
    public ResponseEntity<ExercicioResponse>
            updateExerciseStatus(
                    @PathVariable Long exerciseId,
                    @Valid @RequestBody
                    AtualizarStatusRequest request) {

        return ResponseEntity.ok(
                exercicioService.updateStatus(
                        exerciseId,
                        request.ativo()
                )
        );
    }
}