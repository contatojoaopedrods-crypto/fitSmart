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

import com.fitsmart.dto.AvaliacaoDorCompletaResponse;
import com.fitsmart.dto.SalvarAvaliacaoDorRequest;
import com.fitsmart.service.AvaliacaoDorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/pain-assessment"
)
public class AvaliacaoDorController {

    private final AvaliacaoDorService avaliacaoDorService;

    public AvaliacaoDorController(
            AvaliacaoDorService avaliacaoDorService) {

        this.avaliacaoDorService = avaliacaoDorService;
    }

    @PutMapping
    public ResponseEntity<AvaliacaoDorCompletaResponse>
            savePainAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId,
                    @Valid @RequestBody
                    SalvarAvaliacaoDorRequest request) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AvaliacaoDorCompletaResponse response =
                avaliacaoDorService.salvarAvaliacao(
                        professorUserId,
                        studentId,
                        assessmentId,
                        request
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<AvaliacaoDorCompletaResponse>
            getPainAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AvaliacaoDorCompletaResponse response =
                avaliacaoDorService.getAvaliacao(
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