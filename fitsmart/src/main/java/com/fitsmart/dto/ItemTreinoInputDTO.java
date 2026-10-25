package com.fitsmart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ItemTreinoInputDTO {

    @NotNull(message = "O ID do exercício é obrigatório")
    private Long exercicioId;

    @NotNull(message = "A ordem é obrigatória")
    @Min(value = 1, message = "A ordem deve ser maior ou igual a 1")
    private Integer ordem;

    @NotNull(message = "O número de séries é obrigatório")
    @Min(value = 1, message = "Deve haver pelo menos 1 série")
    private Integer series;

    @Min(value = 1, message = "As repetições devem ser maiores que zero")
    private Integer repeticoes;

    private Double carga;
    private Integer tempoSegundos;
    private String observacoes;

    public ItemTreinoInputDTO() {}

    public Long getExercicioId() {
        return exercicioId;
    }

    public void setExercicioId(Long exercicioId) {
        this.exercicioId = exercicioId;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Integer getRepeticoes() {
        return repeticoes;
    }

    public void setRepeticoes(Integer repeticoes) {
        this.repeticoes = repeticoes;
    }

    public Double getCarga() {
        return carga;
    }

    public void setCarga(Double carga) {
        this.carga = carga;
    }

    public Integer getTempoSegundos() {
        return tempoSegundos;
    }

    public void setTempoSegundos(Integer tempoSegundos) {
        this.tempoSegundos = tempoSegundos;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}