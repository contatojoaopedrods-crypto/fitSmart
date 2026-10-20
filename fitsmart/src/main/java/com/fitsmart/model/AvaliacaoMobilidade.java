package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.NivelMobilidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "avaliacao_mobilidade")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoMobilidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao_mobilidade")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_avaliacao_fisica",
        nullable = false
    )
    private AvaliacaoFisica avaliacaoFisica;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "cervical",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade cervical;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "ombro",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade ombro;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "cotovelo",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade cotovelo;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "punho",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade punho;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "toracica",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade toracica;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "lombar",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade lombar;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "quadril",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade quadril;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "joelho",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade joelho;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "tornozelo",
        columnDefinition = "enum_nivel_mobilidade"
    )
    private NivelMobilidade tornozelo;

    @Column(
        name = "observacao",
        columnDefinition = "TEXT"
    )
    private String observacao;

    public AvaliacaoMobilidade(
            AvaliacaoFisica avaliacaoFisica) {

        this.avaliacaoFisica = avaliacaoFisica;
    }
}