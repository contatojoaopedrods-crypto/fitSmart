package com.fitsmart.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fitsmart.model.enums.CargaAxial;
import com.fitsmart.model.enums.DificuldadeExercicio;
import com.fitsmart.model.enums.Estabilidade;
import com.fitsmart.model.enums.Impacto;
import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.model.enums.PlanoMovimento;
import com.fitsmart.model.enums.PressaoAbdominal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercicio")
@Getter 
@Setter 
@NoArgsConstructor
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio")
    private Long id;

    @Column(
        name = "nome",
        nullable = false
    )
    private String nome;

    @Column(
        name = "descricao",
        columnDefinition = "TEXT"
    )
    private String descricao;

    @Column(name = "caminho_imagem")
    private String caminhoImagem;

    @Column(name = "url_video")
    private String urlVideo;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "plano_movimento",
        nullable = false,
        columnDefinition = "enum_plano_movimento"
    )
    private PlanoMovimento planoMovimento;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "carga_axial",
        nullable = false,
        columnDefinition = "enum_carga_axial"
    )
    private CargaAxial cargaAxial;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "pressao_abdominal",
        nullable = false,
        columnDefinition = "enum_pressao_abdominal"
    )
    private PressaoAbdominal pressaoAbdominal;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "estabilidade_exigida",
        nullable = false,
        columnDefinition = "enum_estabilidade"
    )
    private Estabilidade estabilidadeExigida;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "nivel_experiencia",
        nullable = false,
        columnDefinition = "enum_nivel_experiencia"
    )
    private NivelExperiencia nivelExperiencia;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "dificuldade",
        nullable = false,
        columnDefinition = "enum_dificuldade_exercicio"
    )
    private DificuldadeExercicio dificuldade;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_cervical",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoCervical;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_ombro",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoOmbro;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_cotovelo",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoCotovelo;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_punho",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoPunho;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_toracica",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoToracica;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_lombar",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoLombar;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_quadril",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoQuadril;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_joelho",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoJoelho;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "impacto_tornozelo",
        nullable = false,
        columnDefinition = "enum_impacto"
    )
    private Impacto impactoTornozelo;

    @Column(
        name = "ativo",
        nullable = false
    )
    private boolean ativo = true;

    @OneToMany(
        mappedBy = "exercicio",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ExercicioEquipamento> equipamentos =
            new ArrayList<>();

    @OneToMany(
        mappedBy = "exercicio",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ExercicioGrupoMuscular> gruposMusculares =
            new ArrayList<>();

    @OneToMany(
        mappedBy = "exercicio",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ExercicioAcaoArticular> acoesArticulares =
            new ArrayList<>();

    public void addEquipamento(
            ExercicioEquipamento equipamento) {

        equipamentos.add(equipamento);
        equipamento.setExercicio(this);
    }

    public void addGrupoMuscular(
            ExercicioGrupoMuscular grupoMuscular) {

        gruposMusculares.add(grupoMuscular);
        grupoMuscular.setExercicio(this);
    }

    public void addAcaoArticular(
            ExercicioAcaoArticular acaoArticular) {

        acoesArticulares.add(acaoArticular);
        acaoArticular.setExercicio(this);
    }

    public void limparRelacionamentos() {

        equipamentos.clear();
        gruposMusculares.clear();
        acoesArticulares.clear();
    }
}