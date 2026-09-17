package com.fitsmart.dto;

import java.util.ArrayList;
import java.util.List;

public class AtualizarTreinoDTO {

    private String observacoes;
    private List<ItemTreinoInputDTO> itens = new ArrayList<>();

    public AtualizarTreinoDTO() {}

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public List<ItemTreinoInputDTO> getItens() { return itens; }
    public void setItens(List<ItemTreinoInputDTO> itens) { this.itens = itens; }
}
