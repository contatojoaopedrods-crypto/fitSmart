package com.fitsmart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fitsmart.dto.ResultadoRecomendacaoResponse;
import com.fitsmart.service.MotorRecomendacaoService;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}"
    + "/assessments/{assessmentId}/recommendations"
)
public class RecomendacaoController {

    private final MotorRecomendacaoService motorRecomendacaoService;

    public RecomendacaoController(
            MotorRecomendacaoService motorRecomendacaoService) {

        this.motorRecomendacaoService =
                motorRecomendacaoService;
    }

    @GetMapping
    public ResponseEntity<ResultadoRecomendacaoResponse>
            getRecommendations(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @PathVariable Long assessmentId) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        ResultadoRecomendacaoResponse response =
                motorRecomendacaoService.gerarRecomendacoes(
                        professorUserId,
                        studentId,
                        assessmentId
                );

        return ResponseEntity.ok(response);
    }

    private Long getAuthenticatedUserId(Jwt jwt) {

        if (jwt == null) {
            throw unauthorized();
        }

        Object userIdClaim = jwt.getClaim("user_id");

        if (userIdClaim == null) {
            throw unauthorized();
        }

        try {
            Long userId =
                    Long.valueOf(userIdClaim.toString());

            if (userId <= 0) {
                throw unauthorized();
            }

            return userId;

        } catch (NumberFormatException exception) {
            throw unauthorized();
        }
    }

    private ResponseStatusException unauthorized() {

        return new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Token sem identificação válida do usuário"
        );
    }
}