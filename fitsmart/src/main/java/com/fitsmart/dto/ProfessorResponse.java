package com.fitsmart.dto;

import com.fitsmart.model.enums.StatusCref;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfessorResponse {

    private Long id;
    private UserResponse user;
    private String cref;
    private StatusCref statusCref;
    
}
