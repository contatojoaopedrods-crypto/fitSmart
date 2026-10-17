package com.fitsmart.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercicio")
@Getter
@Setter
@NoArgsConstructor
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio")
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
        joinColumns = @JoinColumn(name = "id_exercicio"),
        inverseJoinColumns = @JoinColumn(name = "id_acao_articular")
    )
    private List<AcaoArticular> acoesArticulares = new ArrayList<>();

    // Restrições de Limitações Biomecânicas
    @ManyToMany
    @JoinTable(
        name = "exercicio_limitacao_biomecanica",
        joinColumns = @JoinColumn(name = "id_exercicio"),
        inverseJoinColumns = @JoinColumn(name = "limitacao_id")
    )
    private List<LimitacaoBiomecanica> restricoesLimitacoes = new ArrayList<>();

    // Restrições de Lesões
    @ManyToMany
    @JoinTable(
        name = "exercicio_lesao",
        joinColumns = @JoinColumn(name = "id_exercicio"),
        inverseJoinColumns = @JoinColumn(name = "id_lesao")
    )
    private List<Lesao> restricoesLesoes = new ArrayList<>();
}