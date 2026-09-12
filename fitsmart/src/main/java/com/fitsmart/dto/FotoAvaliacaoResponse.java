package com.fitsmart.dto;

import java.time.LocalDateTime;

import com.fitsmart.model.enums.TipoFotoAvaliacao;

public record FotoAvaliacaoResponse(

        Long id,

        TipoFotoAvaliacao tipo,

        String caminhoArquivo,

        LocalDateTime dataUpload

) {
}