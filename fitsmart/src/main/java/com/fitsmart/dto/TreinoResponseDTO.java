package com.fitsmart.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fitsmart.model.StatusTreino;

public class TreinoResponseDTO {

    private Long id;
    private StatusTreino status;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataPublicacao;
    private String observacoes;
    private Long alunoId;
    private Long professorId;
    private List<ItemTreinoResponseDTO> itens = new ArrayList<>();

    public TreinoResponseDTO() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StatusTreino getStatus() { return status; }
    public void setStatus(StatusTreino status) { this.status = status; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }

    public LocalDateTime getDataPublicacao() { return dataPublicacao; }
    public void setDataPublicacao(LocalDateTime dataPublicacao) { this.dataPublicacao = dataPublicacao; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public Long getAlunoId() { return alunoId; }
    public void setAlunoId(Long alunoId) { this.alunoId = alunoId; }

    public Long getProfessorId() { return professorId; }
    public void setProfessorId(Long professorId) { this.professorId = professorId; }

    public List<ItemTreinoResponseDTO> getItens() { return itens; }
    public void setItens(List<ItemTreinoResponseDTO> itens) { this.itens = itens; }
}