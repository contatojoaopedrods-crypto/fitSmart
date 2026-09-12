package com.fitsmart.model;

import java.time.LocalDateTime;

import com.fitsmart.model.enums.TipoFotoAvaliacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "foto_avaliacao",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_foto_avaliacao_tipo",
            columnNames = {
                "id_avaliacao_fisica",
                "tipo"
            }
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
public class FotoAvaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_foto_avaliacao")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_avaliacao_fisica", nullable = false)
    private AvaliacaoFisica avaliacaoFisica;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoFotoAvaliacao tipo;

    @Column(name = "caminho_arquivo", nullable = false, length = 500)
    private String caminhoArquivo;

    @Column(name = "data_upload", nullable = false)
    private LocalDateTime dataUpload;

    public FotoAvaliacao(
            AvaliacaoFisica avaliacaoFisica,
            TipoFotoAvaliacao tipo,
            String caminhoArquivo) {

        this.avaliacaoFisica = avaliacaoFisica;
        this.tipo = tipo;
        this.caminhoArquivo = caminhoArquivo;
    }

    @PrePersist
    private void beforeInsert() {

        if (dataUpload == null) {
            dataUpload = LocalDateTime.now();
        }
    }

    
}