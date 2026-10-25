package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.ResultadoRecomendacaoResponse;
import com.fitsmart.security.JwtUtils;
import com.fitsmart.service.MotorRecomendacaoService;

@RestController
@RequestMapping("/professors/me/students/{studentId}/assessments/{assessmentId}/recommendations")
public class RecomendacaoController {

    private final MotorRecomendacaoService motorService;

    public RecomendacaoController(MotorRecomendacaoService motorService) {
        this.motorService = motorService;
    }

    @GetMapping
    public ResponseEntity<ResultadoRecomendacaoResponse> gerar(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long studentId,
            @PathVariable Long assessmentId) {

        Long professorUserId = JwtUtils.getUserId(jwt);
        return ResponseEntity.ok(motorService.gerar(professorUserId, studentId, assessmentId));
    }
}