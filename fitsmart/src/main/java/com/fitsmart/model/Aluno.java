package com.fitsmart.model;

import jakarta.persistence.Entity;
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
        nullable = false)
    private Professor professor;

    public Aluno(User user, Professor professor) {
        this.user = user;
        this.professor = professor;
    }
    
}
