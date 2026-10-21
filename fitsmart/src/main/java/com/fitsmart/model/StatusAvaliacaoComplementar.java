package com.fitsmart.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "status_avaliacao_complementar")
@Getter
@Setter
@NoArgsConstructor
public class StatusAvaliacaoComplementar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_status_avaliacao_complementar")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_avaliacao_fisica",
        nullable = false,
        unique = true
    )
    private AvaliacaoFisica avaliacaoFisica;

    @Column(name = "dor_concluida", nullable = false)
    private boolean dorConcluida;

    @Column(name = "biomecanica_concluida", nullable = false)
    private boolean biomecanicaConcluida;

    @Column(name = "mobilidade_concluida", nullable = false)
    private boolean mobilidadeConcluida;

    @Column(
        name = "historico_lesoes_revisado",
        nullable = false
    )
    private boolean historicoLesoesRevisado;

    @Column(name = "data_ultima_atualizacao", nullable = false)
    private LocalDateTime dataUltimaAtualizacao;

    public StatusAvaliacaoComplementar(
            AvaliacaoFisica avaliacaoFisica) {

        this.avaliacaoFisica = avaliacaoFisica;
    }

    public boolean isCompleto() {

        return dorConcluida
                && biomecanicaConcluida
                && mobilidadeConcluida
                && historicoLesoesRevisado;
    }

    @PrePersist
    @PreUpdate
    private void atualizarData() {

        dataUltimaAtualizacao = LocalDateTime.now();
    }
}