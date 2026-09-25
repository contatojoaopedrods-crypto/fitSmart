package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.GrupoMuscular;
import com.fitsmart.model.enums.NivelAtivacao;

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
@Table(name = "exercicio_grupo_muscular")
@Getter
@Setter
@NoArgsConstructor
public class ExercicioGrupoMuscular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio_grupo_muscular")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "id_exercicio",
        nullable = false
    )
    private Exercicio exercicio;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "grupo_muscular",
        nullable = false,
        columnDefinition = "enum_grupo_muscular"
    )
    private GrupoMuscular grupoMuscular;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "nivel_ativacao",
        nullable = false,
        columnDefinition = "enum_nivel_ativacao"
    )
    private NivelAtivacao nivelAtivacao;

    public ExercicioGrupoMuscular(
            GrupoMuscular grupoMuscular,
            NivelAtivacao nivelAtivacao) {

        this.grupoMuscular = grupoMuscular;
        this.nivelAtivacao = nivelAtivacao;
    }
}