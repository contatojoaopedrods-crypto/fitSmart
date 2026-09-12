package com.fitsmart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.dto.CreateAvaliacaoFisicaRequest;
import com.fitsmart.dto.UpdateAvaliacaoFisicaRequest;
import com.fitsmart.service.AvaliacaoFisicaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professors/me/students/{studentId}/assessments")
public class AvaliacaoFisicaController {

    private final AvaliacaoFisicaService avaliacaoFisicaService;

    public AvaliacaoFisicaController(
            AvaliacaoFisicaService avaliacaoFisicaService) {

        this.avaliacaoFisicaService = avaliacaoFisicaService;
    }

    @PostMapping
    public ResponseEntity<AvaliacaoFisicaResponse> createAssessment(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @Valid @RequestBody CreateAvaliacaoFisicaRequest request) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoFisicaResponse response = avaliacaoFisicaService.createAvaliacao(
                professorUserId,
                studentId,
                request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    private Long getAuthenticatedUserId(Jwt jwt) {

        Object userIdClaim = jwt.getClaim("user_id");

        if (userIdClaim instanceof Number number) {
            return number.longValue();
        }

        return Long.valueOf(userIdClaim.toString());
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoFisicaResponse>> listAssessments(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        List<AvaliacaoFisicaResponse> response = avaliacaoFisicaService.listAvaliacoes(
                professorUserId,
                studentId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{assessmentId}")
    public ResponseEntity<AvaliacaoFisicaResponse> getAssessment(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @PathVariable Long assessmentId) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoFisicaResponse response = avaliacaoFisicaService.getAvaliacao(
                professorUserId,
                studentId,
                assessmentId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{assessmentId}")
    public ResponseEntity<AvaliacaoFisicaResponse> updateAssessment(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @PathVariable Long assessmentId,
            @Valid @RequestBody UpdateAvaliacaoFisicaRequest request) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoFisicaResponse response = avaliacaoFisicaService.updateAvaliacao(
                professorUserId,
                studentId,
                assessmentId,
                request);

        return ResponseEntity.ok(response);
    }
}