package com.fitsmart.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import com.fitsmart.model.enums.UserRole;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
    private String telefone;
    private LocalDate data_nascimento;
    private String sexo;

    @Enumerated(EnumType.STRING)
    private UserRole tipo_usuario;

    private boolean ativo;
    private LocalDateTime data_cadastro;

    private String cep;
    private String logradouro;

    @Column(name="numero")
    private String numero_residencial;

    private String complemento;
   
}
