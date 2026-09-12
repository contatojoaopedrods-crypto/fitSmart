package com.fitsmart.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import jakarta.persistence.CascadeType;

@Entity
@Table(name = "avaliacao_fisica")
@Getter
@Setter
@NoArgsConstructor
public class AvaliacaoFisica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao_fisica")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_professor", nullable = false)
    private Professor professor;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDateTime dataAvaliacao;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal peso;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal altura;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal imc;

    @Column(name = "percentual_gordura", precision = 5, scale = 2)
    private BigDecimal percentualGordura;

    @Column(name = "massa_gorda", precision = 5, scale = 2)
    private BigDecimal massaGorda;

    @Column(name = "massa_magra", precision = 5, scale = 2)
    private BigDecimal massaMagra;

    @Enumerated(EnumType.STRING)
    @Column(name = "objetivo", nullable = false, length = 30)
    private Objetivo objetivo;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Column(name = "protocolo_calculo", length = 50)
    private String protocoloCalculo;

    @Column(nullable = false)
    private boolean apto;

    @Column(name = "data_ultima_alteracao", nullable = false)
    private LocalDateTime dataUltimaAlteracao;

    @OneToMany(mappedBy = "avaliacaoFisica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DobraCutanea> dobrasCutaneas = new ArrayList<>();

    @OneToMany(mappedBy = "avaliacaoFisica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CircunferenciaCorporal> circunferencias = new ArrayList<>();

    @OneToMany(mappedBy = "avaliacaoFisica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FotoAvaliacao> fotos = new ArrayList<>();

    @OneToMany(mappedBy = "avaliacaoFisica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvaliacaoDor> dores = new ArrayList<>();

    public void addDobraCutanea(DobraCutanea dobraCutanea) {

        dobrasCutaneas.add(dobraCutanea);
        dobraCutanea.setAvaliacaoFisica(this);
    }

    public void addCircunferencia(
            CircunferenciaCorporal circunferencia) {

        circunferencias.add(circunferencia);
        circunferencia.setAvaliacaoFisica(this);
    }

    public void addFoto(FotoAvaliacao foto) {

        fotos.add(foto);
        foto.setAvaliacaoFisica(this);
    }

    public void addDor(AvaliacaoDor avaliacaoDor) {

        dores.add(avaliacaoDor);
        avaliacaoDor.setAvaliacaoFisica(this);
    }

    @PrePersist
    private void beforeInsert() {
        LocalDateTime agora = LocalDateTime.now();

        if (dataAvaliacao == null) {
            dataAvaliacao = agora;
        }

        dataUltimaAlteracao = agora;
    }

    @PreUpdate
    private void beforeUpdate() {
        dataUltimaAlteracao = LocalDateTime.now();
    }
}