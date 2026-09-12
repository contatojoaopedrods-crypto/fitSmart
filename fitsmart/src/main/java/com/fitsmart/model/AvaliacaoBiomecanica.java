package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "avaliacao_biomecanica")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoBiomecanica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao_biomecanica")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_avaliacao_fisica",
        nullable = false
    )
    private AvaliacaoFisica avaliacaoFisica;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_limitacao",
        nullable = false
    )
    private LimitacaoBiomecanica limitacao;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        nullable = false,
        columnDefinition = "enum_lateralidade"
    )
    private Lateralidade lateralidade;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        nullable = false,
        columnDefinition = "enum_gravidade_lesao"
    )
    private GravidadeLesao gravidade;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    public AvaliacaoBiomecanica(
            AvaliacaoFisica avaliacaoFisica,
            LimitacaoBiomecanica limitacao,
            Lateralidade lateralidade,
            GravidadeLesao gravidade,
            String observacao) {

        this.avaliacaoFisica = avaliacaoFisica;
        this.limitacao = limitacao;
        this.lateralidade = lateralidade;
        this.gravidade = gravidade;
        this.observacao = observacao;
    }
}