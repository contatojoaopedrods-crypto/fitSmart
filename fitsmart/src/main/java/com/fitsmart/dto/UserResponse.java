package com.fitsmart.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fitsmart.model.enums.UserRole;

public record UserResponse(
        Long id,
        String nome,
        String sobrenome,
        String email,
        String telefone,
        LocalDate data_nascimento,
        String sexo,
        UserRole tipo_usuario,
        boolean ativo,
        LocalDateTime data_cadastro,
        String cep,
        String logradouro,
        String numero_residencial,
        String complemento) {
}
