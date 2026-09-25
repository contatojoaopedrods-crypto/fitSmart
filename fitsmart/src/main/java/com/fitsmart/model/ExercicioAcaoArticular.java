package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.AmplitudeMovimento;

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
@Table(name = "exercicio_acao_articular")
@Getter
@Setter
@NoArgsConstructor
public class ExercicioAcaoArticular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio_acao_articular")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_exercicio",
        nullable = false
    )
    private Exercicio exercicio;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_acao_articular",
        nullable = false
    )
    private AcaoArticular acaoArticular;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "amplitude_movimento",
        nullable = false,
        columnDefinition = "enum_amplitude_movimento"
    )
    private AmplitudeMovimento amplitudeMovimento;

    public ExercicioAcaoArticular(
            AcaoArticular acaoArticular,
            AmplitudeMovimento amplitudeMovimento) {

        this.acaoArticular = acaoArticular;
        this.amplitudeMovimento = amplitudeMovimento;
    }
}