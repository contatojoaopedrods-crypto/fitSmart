package com.fitsmart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlunoResponse {

    private Long id;
    private UserResponse user;
    private Long professorId;
    
}
