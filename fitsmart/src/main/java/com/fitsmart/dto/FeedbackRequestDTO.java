package com.fitsmart.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class FeedbackRequestDTO {

    @NotNull(message = "O nível de dor é obrigatório")
    @Min(value = 0, message = "O nível de dor mínimo é 0")
    @Max(value = 10, message = "O nível de dor máximo é 10")
    private Integer nivelDor;

    private String dificuldade;
    private String comentarios;

    public FeedbackRequestDTO() {}

    public FeedbackRequestDTO(Integer nivelDor, String dificuldade, String comentarios) {
        this.nivelDor = nivelDor;
        this.dificuldade = dificuldade;
        this.comentarios = comentarios;
    }

    public Integer getNivelDor() {
        return nivelDor;
    }

    public void setNivelDor(Integer nivelDor) {
        this.nivelDor = nivelDor;
    }

    public String getDificuldade() {
        return dificuldade;
    }

    public void setDificuldade(String dificuldade) {
        this.dificuldade = dificuldade;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }
}