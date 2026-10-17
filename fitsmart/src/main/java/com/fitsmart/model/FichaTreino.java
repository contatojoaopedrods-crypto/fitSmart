package com.fitsmart.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ficha_treino")
@Getter
@Setter
@NoArgsConstructor
public class FichaTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha")
    private Long id;

    @Column(nullable = false)
    private String titulo; // Ex: "AB - Hipertrofia Intermediária"

    private String observacoes;

    private LocalDate dataInicio;
    private LocalDate dataFim;

    @Column(nullable = false)
    private boolean ativa = true;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_professor", nullable = false)
    private Professor professor;

    @OneToMany(mappedBy = "fichaTreino", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemTreino> itens = new ArrayList<>();
}