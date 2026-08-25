package com.fitsmart.dto;

import java.util.Locale;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateProfessorRequest {
    

    @Valid
    @NotNull(message = "Os dados do usuário são obrigatórios")
    private CreateUserRequest user;

    @NotBlank(message = "O CREF é obrigatório")
    @Pattern (
        regexp = "^\\d{6}-[GP]/[A-Z]{2}$",
        message = "O CREF deve seguir a formatação padrão e válida" 
    )
    private String cref;

    public void setCref(String cref) {
        if (cref == null) {
            this.cref = null;
            return;
        }

        this.cref = cref
            .replace("\\s+","")
            .toUpperCase(Locale.ROOT);
    }
}
