package com.fitsmart.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "itens_treino")
public class ItemTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_treino")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_treino", nullable = false) // Chave estrangeira para Treino
    private Treino treino;

    @ManyToOne
    @JoinColumn(name = "id_exercicio", nullable = false) // Chave estrangeira para Exercicio
    private Exercicio exercicio;

    private Integer ordem;
    private Integer series;
    private Integer repeticoes;
    private Double carga;

    @Column(name = "tempo_segundos")
    private Integer tempoSegundos;

    private String observacoes;

    public ItemTreino() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Treino getTreino() { return treino; }
    public void setTreino(Treino treino) { this.treino = treino; }

    public Exercicio getExercicio() { return exercicio; }
    public void setExercicio(Exercicio exercicio) { this.exercicio = exercicio; }

    public Integer getOrdem() { return ordem; }
    public void setOrdem(Integer ordem) { this.ordem = ordem; }

    public Integer getSeries() { return series; }
    public void setSeries(Integer series) { this.series = series; }

    public Integer getRepeticoes() { return repeticoes; }
    public void setRepeticoes(Integer repeticoes) { this.repeticoes = repeticoes; }

    public Double getCarga() { return carga; }
    public void setCarga(Double carga) { this.carga = carga; }

    public Integer getTempoSegundos() { return tempoSegundos; }
    public void setTempoSegundos(Integer tempoSegundos) { this.tempoSegundos = tempoSegundos; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}