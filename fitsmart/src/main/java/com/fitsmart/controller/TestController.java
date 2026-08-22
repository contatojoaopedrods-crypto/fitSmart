package com.fitsmart.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestController {
    
    @GetMapping("/teste")
    public String teste() {
        return "Backend FitSmart funcionando!";
    }
    
}
