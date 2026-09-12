package com.fitsmart.dto;

import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.PlanoMovimento;

public record AvaliacaoDorResponse(

        Long id,
        Long acaoArticularId,
        String acaoArticularNome,
        Articulacao articulacao,
        PlanoMovimento planoMovimento,
        Lateralidade lateralidade,
        Integer intensidade

) {
}