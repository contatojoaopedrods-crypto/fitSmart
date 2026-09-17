package com.fitsmart.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "treinos")
public class Treino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StatusTreino status = StatusTreino.RASCUNHO;

    private LocalDateTime dataCriacao = LocalDateTime.now();
    private LocalDateTime dataPublicacao;
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;

    @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemTreino> itens = new ArrayList<>();

    public Treino() {}

    // Helper para adicionar itens mantendo a referência bidirecional
    public void adicionarItem(ItemTreino item) {
        itens.add(item);
        item.setTreino(this);
    }

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

    public Aluno getAluno() { return aluno; }
    public void setAluno(Aluno aluno) { this.aluno = aluno; }

    public Professor getProfessor() { return professor; }
    public void setProfessor(Professor professor) { this.professor = professor; }

    public List<ItemTreino> getItens() { return itens; }
    public void setItens(List<ItemTreino> itens) { this.itens = itens; }
}