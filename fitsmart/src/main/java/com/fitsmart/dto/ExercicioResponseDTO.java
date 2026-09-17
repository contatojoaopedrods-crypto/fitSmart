package com.fitsmart.dto;

import java.util.List;

public class ExercicioResponseDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String dificuldade;
    private String impacto;
    private String objetivo;
    private List<String> acoesArticulares;
    private List<String> restricoesLimitacoes;
    private List<String> restricoesLesoes;

    public ExercicioResponseDTO() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getDificuldade() { return dificuldade; }
    public void setDificuldade(String dificuldade) { this.dificuldade = dificuldade; }

    public String getImpacto() { return impacto; }
    public void setImpacto(String impacto) { this.impacto = impacto; }

    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }

    public List<String> getAcoesArticulares() { return acoesArticulares; }
    public void setAcoesArticulares(List<String> acoesArticulares) { this.acoesArticulares = acoesArticulares; }

    public List<String> getRestricoesLimitacoes() { return restricoesLimitacoes; }
    public void setRestricoesLimitacoes(List<String> restricoesLimitacoes) { this.restricoesLimitacoes = restricoesLimitacoes; }

    public List<String> getRestricoesLesoes() { return restricoesLesoes; }
    public void setRestricoesLesoes(List<String> restricoesLesoes) { this.restricoesLesoes = restricoesLesoes; }
}