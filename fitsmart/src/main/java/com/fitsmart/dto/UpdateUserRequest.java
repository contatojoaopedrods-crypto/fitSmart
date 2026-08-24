package com.fitsmart.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

 @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
    String nome,

    @Size(min = 2, max = 100, message = "O sobrenome deve ter entre 2 e 100 caracteres")
    String sobrenome,

    @Pattern(
        regexp = "\\d{10,11}",
        message = "O telefone deve possuir 10 ou 11 números")
    String telefone,

    @Past(message = "A data de nascimento deve estar no passado")
    LocalDate data_nascimento,

    String sexo,

    @Pattern(
        regexp = "\\d{8}",
        message = "O CEP deve possuir exatamente 8 números")
    String cep,

    @Size(min = 2, max = 150, message = "O logradouro deve ter entre 2 e 150 caracteres")
    String logradouro,

    @Size(min = 1, max = 20, message = "O número residencial é inválido")
    String numero_residencial,

    @Size(max = 100, message = "O complemento deve possuir no máximo 100 caracteres")
    String complemento
) {
}
