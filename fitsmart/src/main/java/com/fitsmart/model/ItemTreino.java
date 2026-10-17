package com.fitsmart.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "itens_treino")
@Getter
@Setter
@NoArgsConstructor
public class ItemTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_treino")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_treino", nullable = false)
    private Treino treino;

    @ManyToOne
    @JoinColumn(name = "id_exercicio", nullable = false)
    private Exercicio exercicio;

    private Integer ordem;
    private Integer series;
    private Integer repeticoes;
    private Double carga;

    @Column(name = "tempo_segundos")
    private Integer tempoSegundos;

    private String observacoes;
}