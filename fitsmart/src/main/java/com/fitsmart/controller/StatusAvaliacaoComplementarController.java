package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.StatusAvaliacaoComplementarResponse;
import com.fitsmart.service.StatusAvaliacaoComplementarService;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/completion-status"
)
public class StatusAvaliacaoComplementarController {

    private final StatusAvaliacaoComplementarService
            statusService;

    public StatusAvaliacaoComplementarController(
            StatusAvaliacaoComplementarService statusService) {

        this.statusService = statusService;
    }

    @GetMapping
    public ResponseEntity<StatusAvaliacaoComplementarResponse>
            getStatus(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        return ResponseEntity.ok(
                statusService.getStatus(
                        professorUserId,
                        studentId,
                        assessmentId
                )
        );
    }

    @PutMapping("/injury-history")
    public ResponseEntity<StatusAvaliacaoComplementarResponse>
            reviewInjuryHistory(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        return ResponseEntity.ok(
                statusService.marcarHistoricoLesoesRevisado(
                        professorUserId,
                        studentId,
                        assessmentId
                )
        );
    }

    private Long getAuthenticatedUserId(Jwt jwt) {

        Object userIdClaim = jwt.getClaim("user_id");

        if (userIdClaim instanceof Number number) {
            return number.longValue();
        }

        return Long.valueOf(userIdClaim.toString());
    }
}