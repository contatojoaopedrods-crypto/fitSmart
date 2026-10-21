package com.fitsmart.model;

import com.fitsmart.model.enums.Objetivo;

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
    name = "exercicio_objetivo",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_exercicio_objetivo",
        columnNames = {"id_exercicio", "objetivo"}
    )
)
@Getter
@Setter
@NoArgsConstructor
public class ExercicioObjetivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio_objetivo")
    private Long id;

    @ManyToOne(
        fetch = FetchType.LAZY,
        optional = false
    )
    @JoinColumn(
        name = "id_exercicio",
        nullable = false
    )
    private Exercicio exercicio;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "objetivo",
        nullable = false,
        length = 30
    )
    private Objetivo objetivo;

    public ExercicioObjetivo(Objetivo objetivo) {
        this.objetivo = objetivo;
    }
}