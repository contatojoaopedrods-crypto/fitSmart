package com.fitsmart.dto;

import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoLimitacao;

public record AvaliacaoBiomecanicaResponse(

        Long id,
        Long limitacaoId,
        Articulacao articulacao,
        TipoLimitacao tipoLimitacao,
        Lateralidade lateralidade,
        GravidadeLesao gravidade,
        String observacao

) {
}