package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.AlunoResponse;
import com.fitsmart.dto.AtualizarNivelExperienciaRequest;
import com.fitsmart.service.AlunoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(
    "/professors/me/students/{studentId}/experience"
)
public class AlunoExperienciaController {

    private final AlunoService alunoService;

    public AlunoExperienciaController(
            AlunoService alunoService) {

        this.alunoService = alunoService;
    }

    @PatchMapping
    public ResponseEntity<AlunoResponse>
            updateExperience(
                    @AuthenticationPrincipal Jwt jwt,
                    @PathVariable Long studentId,
                    @Valid @RequestBody
                    AtualizarNivelExperienciaRequest request) {

        Long professorUserId =
                getAuthenticatedUserId(jwt);

        AlunoResponse response =
                alunoService.updateNivelExperiencia(
                        studentId,
                        professorUserId,
                        request.nivelExperiencia()
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