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
import com.fitsmart.security.JwtUtils;


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

        Long alunoUserId = JwtUtils.getUserId(jwt);

        List<AvaliacaoFisicaResponse> response =
                avaliacaoFisicaService
                        .listMinhasAvaliacoes(alunoUserId);

        return ResponseEntity.ok(response);
    }

}