package com.fitsmart.dto;

import java.time.LocalDateTime;
import java.util.List;

public record StatusAvaliacaoComplementarResponse(

        Long avaliacaoFisicaId,
        Long alunoId,
        boolean dorConcluida,
        boolean biomecanicaConcluida,
        boolean mobilidadeConcluida,
        boolean historicoLesoesRevisado,
        boolean completo,
        List<String> pendencias,
        LocalDateTime dataUltimaAtualizacao

) {
}