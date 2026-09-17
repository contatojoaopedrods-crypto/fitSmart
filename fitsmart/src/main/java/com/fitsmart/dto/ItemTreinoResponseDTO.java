package com.fitsmart.dto;

public class ItemTreinoResponseDTO {

    private Long id;
    private Long exercicioId;
    private String exercicioNome;
    private Integer ordem;
    private Integer series;
    private Integer repeticoes;
    private Double carga;
    private Integer tempoSegundos;
    private String observacoes;

    public ItemTreinoResponseDTO() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExercicioId() { return exercicioId; }
    public void setExercicioId(Long exercicioId) { this.exercicioId = exercicioId; }

    public String getExercicioNome() { return exercicioNome; }
    public void setExercicioNome(String exercicioNome) { this.exercicioNome = exercicioNome; }

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