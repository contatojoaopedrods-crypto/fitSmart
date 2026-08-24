package com.fitsmart.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String nome,
        String sobrenome,
        String email,
        String telefone,
        LocalDate data_nascimento,
        String sexo,
        String tipo_usuario,
        boolean ativo,
        LocalDateTime data_cadastro,
        String cep,
        String logradouro,
        String numero_residencial,
        String complemento) {
}
