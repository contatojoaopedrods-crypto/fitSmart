package com.fitsmart.dto;

import java.time.LocalDate;

import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.StatusLesao;

public record AvaliacaoLesaoResponse(

        Long id,
        Long alunoId,
        Long professorId,
        Long lesaoId,
        String nomeLesao,
        Articulacao articulacao,
        Lateralidade lateralidade,
        StatusLesao statusLesao,
        GravidadeLesao gravidade,
        LocalDate dataAvaliacao,
        LocalDate dataInicio,
        boolean liberacaoMedica,
        boolean dorAtualmente,
        String observacoes

) {
}