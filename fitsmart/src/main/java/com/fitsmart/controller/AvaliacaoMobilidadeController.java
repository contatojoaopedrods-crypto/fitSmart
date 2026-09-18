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

import com.fitsmart.dto.AvaliacaoMobilidadeResponse;
import com.fitsmart.dto.SalvarAvaliacaoMobilidadeRequest;
import com.fitsmart.service.AvaliacaoMobilidadeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/mobility-assessment"
)
public class AvaliacaoMobilidadeController {

    private final AvaliacaoMobilidadeService
            avaliacaoMobilidadeService;

    public AvaliacaoMobilidadeController(
            AvaliacaoMobilidadeService
                    avaliacaoMobilidadeService) {

        this.avaliacaoMobilidadeService =
                avaliacaoMobilidadeService;
    }

    @PutMapping
    public ResponseEntity<AvaliacaoMobilidadeResponse>
            saveAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId,
                    @Valid @RequestBody
                    SalvarAvaliacaoMobilidadeRequest request) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AvaliacaoMobilidadeResponse response =
                avaliacaoMobilidadeService
                        .salvarAvaliacao(
                                professorUserId,
                                studentId,
                                assessmentId,
                                request
                        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<AvaliacaoMobilidadeResponse>
            getAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AvaliacaoMobilidadeResponse response =
                avaliacaoMobilidadeService
                        .getAvaliacao(
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