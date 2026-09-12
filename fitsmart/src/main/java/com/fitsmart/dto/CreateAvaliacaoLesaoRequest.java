package com.fitsmart.dto;

import java.time.LocalDate;

import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.StatusLesao;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

public record CreateAvaliacaoLesaoRequest(

        @NotNull(message = "A lesão é obrigatória")
        Long lesaoId,

        @NotNull(message = "A lateralidade é obrigatória")
        Lateralidade lateralidade,

        @NotNull(message = "O status da lesão é obrigatório")
        StatusLesao statusLesao,

        @NotNull(message = "A gravidade é obrigatória")
        GravidadeLesao gravidade,

        @PastOrPresent(
            message = "A data de início não pode estar no futuro"
        )
        LocalDate dataInicio,

        @NotNull(message = "Informe se existe liberação médica")
        Boolean liberacaoMedica,

        @NotNull(message = "Informe se existe dor atualmente")
        Boolean dorAtualmente,

        @Size(
            max = 2000,
            message = "As observações devem possuir no máximo 2000 caracteres"
        )
        String observacoes

) {
}