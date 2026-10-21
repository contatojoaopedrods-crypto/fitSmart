package com.fitsmart.dto;

import com.fitsmart.model.enums.NivelExperiencia;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AlunoResponse {

    private Long id;
    private UserResponse user;
    private Long professorId;
    private NivelExperiencia nivelExperiencia;

    public AlunoResponse(Long id, UserResponse user, Long professorId, NivelExperiencia nivelExperiencia) {
        this.id = id;
        this.user = user;
        this.professorId = professorId;
        this.nivelExperiencia = nivelExperiencia;
    }
}