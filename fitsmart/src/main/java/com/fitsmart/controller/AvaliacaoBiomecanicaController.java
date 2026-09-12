package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AvaliacaoBiomecanicaCompletaResponse;
import com.fitsmart.dto.SalvarAvaliacaoBiomecanicaRequest;
import com.fitsmart.service.AvaliacaoBiomecanicaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/biomechanical-assessment"
)
public class AvaliacaoBiomecanicaController {

    private final AvaliacaoBiomecanicaService avaliacaoService;

    public AvaliacaoBiomecanicaController(
            AvaliacaoBiomecanicaService avaliacaoService) {

        this.avaliacaoService = avaliacaoService;
    }

    @PutMapping
    public ResponseEntity<AvaliacaoBiomecanicaCompletaResponse>
            saveAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId,
                    @Valid @RequestBody
                    SalvarAvaliacaoBiomecanicaRequest request) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoBiomecanicaCompletaResponse response =
                avaliacaoService.salvarAvaliacao(
                        professorUserId,
                        studentId,
                        assessmentId,
                        request
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<AvaliacaoBiomecanicaCompletaResponse>
            getAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoBiomecanicaCompletaResponse response =
                avaliacaoService.getAvaliacao(
                        professorUserId,
                        studentId,
                        assessmentId
                );

        return ResponseEntity.ok(response);
    }

    private Long getAuthenticatedUserId(Jwt jwt) {

        Object userIdClaim = jwt.getClaim("user_id");

        if (userIdClaim instanceof Number number) {
            return number.longValue();
        }

        return Long.valueOf(userIdClaim.toString());
    }
}