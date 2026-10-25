package com.fitsmart.model;

import com.fitsmart.model.enums.TipoRemetente;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_mensagens")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long remetenteId;

    @Column(nullable = false)
    private Long destinatarioId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String texto;

    private LocalDateTime dataEnvio = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoRemetente tipoRemetente;

    private boolean lida = false;

    public Mensagem() {}

    public Mensagem(Long remetenteId, Long destinatarioId, String texto, TipoRemetente tipoRemetente) {
        this.remetenteId = remetenteId;
        this.destinatarioId = destinatarioId;
        this.texto = texto;
        this.tipoRemetente = tipoRemetente;
        this.dataEnvio = LocalDateTime.now();
        this.lida = false;
    }

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