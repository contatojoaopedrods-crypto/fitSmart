package com.fitsmart.dto;

import com.fitsmart.model.enums.TipoRemetente;
import com.fitsmart.model.Mensagem;
import java.time.LocalDateTime;

public class MensagemDTO {

    private Long id;
    private Long remetenteId;
    private Long destinatarioId;
    private String texto;
    private LocalDateTime dataEnvio;
    private TipoRemetente tipoRemetente;
    private boolean lida;

    public MensagemDTO() {}

    public MensagemDTO(Mensagem mensagem) {
        this.id = mensagem.getId();
        this.remetenteId = mensagem.getRemetenteId();
        this.destinatarioId = mensagem.getDestinatarioId();
        this.texto = mensagem.getTexto();
        this.dataEnvio = mensagem.getDataEnvio();
        this.tipoRemetente = mensagem.getTipoRemetente();
        this.lida = mensagem.isLida();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getRemetenteId() { return remetenteId; }
    public void setRemetenteId(Long remetenteId) { this.remetenteId = remetenteId; }

    public Long getDestinatarioId() { return destinatarioId; }
    public void setDestinatarioId(Long destinatarioId) { this.destinatarioId = destinatarioId; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }

    public TipoRemetente getTipoRemetente() { return tipoRemetente; }
    public void setTipoRemetente(TipoRemetente tipoRemetente) { this.tipoRemetente = tipoRemetente; }

    public boolean isLida() { return lida; }
    public void setLida(boolean lida) { this.lida = lida; }
}