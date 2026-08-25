package com.fitsmart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;

import com.fitsmart.dto.AlunoResponse;
import com.fitsmart.dto.CreateAlunoRequest;
import com.fitsmart.dto.CreateProfessorRequest;
import com.fitsmart.dto.ProfessorResponse;
import com.fitsmart.service.AlunoService;
import com.fitsmart.service.ProfessorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professors")
public class ProfessorController {

    private final ProfessorService professorService;
    private final AlunoService alunoService;

    public ProfessorController(
            ProfessorService professorService,
            AlunoService alunoService) {

        this.professorService = professorService;
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<ProfessorResponse> createProfessor(
            @Valid @RequestBody CreateProfessorRequest request) {

        ProfessorResponse professor = professorService.createProfessor(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(professor);
    }

    @GetMapping("/me")
    public ResponseEntity<ProfessorResponse> getMyProfile(
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = Long.valueOf(jwt.getClaim("user_id").toString());

        ProfessorResponse response = professorService.getProfessorByUserId(userId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/students")
    public ResponseEntity<AlunoResponse> createStudent(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CreateAlunoRequest request) {

        Long professorUserId = Long.valueOf(
                jwt.getClaim("user_id").toString());

        AlunoResponse response = alunoService.createAluno(
                professorUserId,
                request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

}
