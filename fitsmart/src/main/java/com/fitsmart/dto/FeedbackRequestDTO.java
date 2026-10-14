package com.fitsmart.dto;

public class FeedbackRequestDTO {

    private Integer nivelDor;        
    private String dificuldade;       
    private String comentarios;        

    
    public FeedbackRequestDTO() {
    }

    
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