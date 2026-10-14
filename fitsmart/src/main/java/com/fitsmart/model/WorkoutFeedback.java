package com.fitsmart.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_feedbacks")
public class WorkoutFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;
    private Integer nivelDor;
    private String dificuldade;
    private String comentarios;

    public WorkoutFeedback() {
    }

    public WorkoutFeedback(Long sessionId, Integer nivelDor, String dificuldade, String comentarios) {
        this.sessionId = sessionId;
        this.nivelDor = nivelDor;
        this.dificuldade = dificuldade;
        this.comentarios = comentarios;
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
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