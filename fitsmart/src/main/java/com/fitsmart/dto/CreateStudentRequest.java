package com.fitsmart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateStudentRequest {

    @Valid
    @NotNull(message = "Os dados do usuário são obrigatórios")
    private CreateUserRequest user;

    // Se houver algum campo específico de aluno futuramente (ex: id do professor responsável, objetivo), adicionamos aqui.
}
