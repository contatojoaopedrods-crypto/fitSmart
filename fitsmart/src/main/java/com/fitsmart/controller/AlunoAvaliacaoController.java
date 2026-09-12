package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.service.AvaliacaoFisicaService;

@RestController
@RequestMapping("/students/me/assessments")
public class AlunoAvaliacaoController {

    private final AvaliacaoFisicaService avaliacaoFisicaService;

    public AlunoAvaliacaoController(
            AvaliacaoFisicaService avaliacaoFisicaService) {

        this.avaliacaoFisicaService = avaliacaoFisicaService;
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoFisicaResponse>>
            listMyAssessments(
                    @AuthenticationPrincipal Jwt jwt) {

        Long alunoUserId = getAuthenticatedUserId(jwt);

        List<AvaliacaoFisicaResponse> response =
                avaliacaoFisicaService
                        .listMinhasAvaliacoes(alunoUserId);

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