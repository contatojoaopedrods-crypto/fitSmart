package com.fitsmart.dto;

import com.fitsmart.model.enums.StatusCref;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfessorResponse {

    private Long id;
    private UserResponse user;
    private String cref;
    private StatusCref statusCref;

    public ProfessorResponse(Long id, UserResponse user, String cref, StatusCref statusCref) {
        this.id = id;
        this.user = user;
        this.cref = cref;
        this.statusCref = statusCref;
    }
}