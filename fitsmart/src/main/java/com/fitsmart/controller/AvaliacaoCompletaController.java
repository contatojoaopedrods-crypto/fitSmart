package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AvaliacaoCompletaResponse;
import com.fitsmart.service.AvaliacaoCompletaService;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/complete"
)
public class AvaliacaoCompletaController {

    private final AvaliacaoCompletaService
            avaliacaoCompletaService;

    public AvaliacaoCompletaController(
            AvaliacaoCompletaService
                    avaliacaoCompletaService) {

        this.avaliacaoCompletaService =
                avaliacaoCompletaService;
    }

    @GetMapping
    public ResponseEntity<AvaliacaoCompletaResponse>
            getCompleteAssessment(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AvaliacaoCompletaResponse response =
                avaliacaoCompletaService
                        .getAvaliacaoCompleta(
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
