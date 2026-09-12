package com.fitsmart.model;

import java.math.BigDecimal;

import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoDobraCutanea;

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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "dobra_cutanea",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_dobra_cutanea_avaliacao_tipo_lado",
            columnNames = {
                "id_avaliacao_fisica",
                "tipo",
                "lateralidade"
            }
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
public class DobraCutanea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dobra_cutanea")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_avaliacao_fisica", nullable = false)
    private AvaliacaoFisica avaliacaoFisica;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoDobraCutanea tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Lateralidade lateralidade;

    @Column(name = "valor_mm", nullable = false, precision = 5, scale = 2)
    private BigDecimal valorMm;

    public DobraCutanea(
            AvaliacaoFisica avaliacaoFisica,
            TipoDobraCutanea tipo,
            Lateralidade lateralidade,
            BigDecimal valorMm) {

        this.avaliacaoFisica = avaliacaoFisica;
        this.tipo = tipo;
        this.lateralidade = lateralidade;
        this.valorMm = valorMm;
    }
}