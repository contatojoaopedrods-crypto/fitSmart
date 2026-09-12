package com.fitsmart.model;

import com.fitsmart.model.enums.Lateralidade;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
@Table(name = "avaliacao_dor")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoDor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao_dor")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_avaliacao_fisica",
        nullable = false
    )
    private AvaliacaoFisica avaliacaoFisica;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_acao_articular",
        nullable = false
    )
    private AcaoArticular acaoArticular;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        nullable = false,
        columnDefinition = "enum_lateralidade"
    )
    private Lateralidade lateralidade;

    @Column(nullable = false)
    private Integer intensidade;

    public AvaliacaoDor(
            AvaliacaoFisica avaliacaoFisica,
            AcaoArticular acaoArticular,
            Lateralidade lateralidade,
            Integer intensidade) {

        this.avaliacaoFisica = avaliacaoFisica;
        this.acaoArticular = acaoArticular;
        this.lateralidade = lateralidade;
        this.intensidade = intensidade;
    }
}