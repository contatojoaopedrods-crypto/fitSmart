package com.fitsmart.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

        @NotBlank(message = "o nome é obrigatório") @Size(min = 2, max = 100, message = "O nome deve conter entre 2 e 100 caracteres") String nome,

        @NotBlank(message = "o nome é obrigatório")
        @Size(min = 2, max = 100, message = "O nome deve conter entre 2 e 100 caracteres") 
        String sobrenome,

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "Informe um e-mail válido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 8, max = 100, message = "A senha deve ter pelo menos 8 caracteres")
        String senha,

        @NotBlank(message = "O telefone é obrigatório")
        @Pattern(
        regexp = "\\d{10,11}",
        message = "O telefone deve possuir 10 ou 11 números")
        String telefone,

        @NotNull(message = "A data de nascimento é obrigatória")
        @Past(message = "A data de nascimento deve estar no passado")
        LocalDate data_nascimento,


        @NotBlank(message = "O sexo é obrigatório")
        String sexo,

        @NotBlank(message = "O CEP é obrigatório")
        @Pattern(
        regexp = "\\d{8}",
        message = "O CEP deve possuir exatamente 8 números")
        String cep,

        @NotBlank(message = "O logradouro é obrigatório")
        String logradouro,

         @NotBlank(message = "O número residencial é obrigatório")
         String numero_residencial,
         
         String complemento) {
}
