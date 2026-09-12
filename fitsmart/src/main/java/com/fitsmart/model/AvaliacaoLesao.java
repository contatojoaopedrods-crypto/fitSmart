package com.fitsmart.model;

import java.time.LocalDate;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.StatusLesao;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "avaliacao_lesao")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoLesao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao_lesao")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_professor", nullable = false)
    private Professor professor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_lesao", nullable = false)
    private Lesao lesao;

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
        name = "status_lesao",
        nullable = false,
        columnDefinition = "enum_status_lesao"
    )
    private StatusLesao statusLesao;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        nullable = false,
        columnDefinition = "enum_gravidade_lesao"
    )
    private GravidadeLesao gravidade;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "liberacao_medica", nullable = false)
    private boolean liberacaoMedica;

    @Column(name = "dor_atualmente", nullable = false)
    private boolean dorAtualmente;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @PrePersist
    private void beforeInsert() {

        if (dataAvaliacao == null) {
            dataAvaliacao = LocalDate.now();
        }
    }
}