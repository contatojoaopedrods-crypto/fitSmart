package com.fitsmart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class CreateTreinoRequestDTO {

    @NotNull(message = "O ID do aluno é obrigatório")
    private Long alunoId;

    @NotBlank(message = "O título do treino é obrigatório")
    private String titulo;

    private String observacoes;

    @Valid
    private List<ItemTreinoRequestDTO> itens = new ArrayList<>();

    public CreateTreinoRequestDTO() {}

    // Getters e Setters
    public Long getAlunoId() { return alunoId; }
    public void setAlunoId(Long alunoId) { this.alunoId = alunoId; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public List<ItemTreinoRequestDTO> getItens() { return itens; }
    public void setItens(List<ItemTreinoRequestDTO> itens) { this.itens = itens; }
}