package com.fitsmart.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.PlanoMovimento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "acao_articular")
@Getter
@Setter
@NoArgsConstructor
public class AcaoArticular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acao_articular")
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        nullable = false,
        columnDefinition = "enum_articulacao"
    )
    private Articulacao articulacao;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "plano_movimento",
        nullable = false,
        columnDefinition = "enum_plano_movimento"
    )
    private PlanoMovimento planoMovimento;

    public AcaoArticular(
            String nome,
            Articulacao articulacao,
            PlanoMovimento planoMovimento) {

        this.nome = nome;
        this.articulacao = articulacao;
        this.planoMovimento = planoMovimento;
    }
}
