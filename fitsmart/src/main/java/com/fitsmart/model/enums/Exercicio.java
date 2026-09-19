package com.fitsmart.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "exercicios")
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String dificuldade; // Ex: Iniciante, Intermediário, Avançado
    private String impacto;     // Ex: Baixo, Médio, Alto
    private String objetivo;    // Ex: Hipertrofia, Resistência, Mobilidade

    // Relacionamento com as Ações Articulares envolvidas
    @ManyToMany
    @JoinTable(
        name = "exercicio_acao_articular",
        joinColumns = @JoinColumn(name = "exercicio_id"),
        inverseJoinColumns = @JoinColumn(name = "acao_articular_id")
    )
    private List<AcaoArticular> acoesArticulares = new ArrayList<>();

    // Restrições de Limitações Biomecânicas
    @ManyToMany
    @JoinTable(
        name = "exercicio_limitacao_biomecanica",
        joinColumns = @JoinColumn(name = "exercicio_id"),
        inverseJoinColumns = @JoinColumn(name = "limitacao_id")
    )
    private List<LimitacaoBiomecanica> restricoesLimitacoes = new ArrayList<>();

    // Restrições de Lesões
    @ManyToMany
    @JoinTable(
        name = "exercicio_lesao",
        joinColumns = @JoinColumn(name = "exercicio_id"),
        inverseJoinColumns = @JoinColumn(name = "lesao_id")
    )
    private List<Lesao> restricoesLesoes = new ArrayList<>();

    public Exercicio() {}

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

    public List<AcaoArticular> getAcoesArticulares() { return acoesArticulares; }
    public void setAcoesArticulares(List<AcaoArticular> acoesArticulares) { this.acoesArticulares = acoesArticulares; }

    public List<LimitacaoBiomecanica> getRestricoesLimitacoes() { return restricoesLimitacoes; }
    public void setRestricoesLimitacoes(List<LimitacaoBiomecanica> restricoesLimitacoes) { this.restricoesLimitacoes = restricoesLimitacoes; }

    public List<Lesao> getRestricoesLesoes() { return restricoesLesoes; }
    public void setRestricoesLesoes(List<Lesao> restricoesLesoes) { this.restricoesLesoes = restricoesLesoes; }
}