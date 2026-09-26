package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.NivelExperiencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "aluno")
@Getter
@Setter
@NoArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aluno")
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(
        name = "id_usuario",
        nullable = false,
        unique = true
    )
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(
        name = "id_professor",
        nullable = false
    )
    private Professor professor;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "nivel_experiencia",
        nullable = false,
        columnDefinition = "enum_nivel_experiencia"
    )
    private NivelExperiencia nivelExperiencia;

    public Aluno(
            User user,
            Professor professor,
            NivelExperiencia nivelExperiencia) {

        this.user = user;
        this.professor = professor;
        this.nivelExperiencia = nivelExperiencia;
    }
}