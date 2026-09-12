package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AvaliacaoLesaoResponse;
import com.fitsmart.dto.CreateAvaliacaoLesaoRequest;
import com.fitsmart.service.AvaliacaoLesaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}/injury-assessments"
)
public class AvaliacaoLesaoController {

    private final AvaliacaoLesaoService avaliacaoLesaoService;

    public AvaliacaoLesaoController(
            AvaliacaoLesaoService avaliacaoLesaoService) {

        this.avaliacaoLesaoService = avaliacaoLesaoService;
    }

    @PostMapping
    public ResponseEntity<AvaliacaoLesaoResponse> createAssessment(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @Valid @RequestBody
            CreateAvaliacaoLesaoRequest request) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        AvaliacaoLesaoResponse response =
                avaliacaoLesaoService.createAvaliacao(
                        professorUserId,
                        studentId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoLesaoResponse>>
            listAssessments(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        return ResponseEntity.ok(
                avaliacaoLesaoService.listAvaliacoes(
                        professorUserId,
                        studentId
                )
        );
    }

    @GetMapping("/{injuryAssessmentId}")
    public ResponseEntity<AvaliacaoLesaoResponse> getAssessment(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @PathVariable Long injuryAssessmentId) {

        Long professorUserId = getAuthenticatedUserId(jwt);

        return ResponseEntity.ok(
                avaliacaoLesaoService.getAvaliacao(
                        professorUserId,
                        studentId,
                        injuryAssessmentId
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