package com.fitsmart.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fitsmart.model.enums.Objetivo;

public record AvaliacaoFisicaResponse(

        Long id,

        Long alunoId,

        Long professorId,

        LocalDateTime dataAvaliacao,

        BigDecimal peso,

        BigDecimal altura,

        BigDecimal imc,

        BigDecimal percentualGordura,

        BigDecimal massaGorda,

        BigDecimal massaMagra,

        Objetivo objetivo,

        String observacoes,

        String protocoloCalculo,

        boolean apto,

        LocalDateTime dataUltimaAlteracao,

        List<DobraCutaneaResponse> dobrasCutaneas,

        List<CircunferenciaResponse> circunferencias,

        List<FotoAvaliacaoResponse> fotos

) {
}