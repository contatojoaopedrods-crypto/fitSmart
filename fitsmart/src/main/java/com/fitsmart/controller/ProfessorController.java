package com.fitsmart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.fitsmart.dto.AlunoResponse;
import com.fitsmart.dto.CreateAlunoRequest;
import com.fitsmart.dto.CreateProfessorRequest;
import com.fitsmart.dto.ProfessorResponse;
import com.fitsmart.service.AlunoService;
import com.fitsmart.service.ProfessorService;
import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professors")
public class ProfessorController {

        private final ProfessorService professorService;
        private final AlunoService alunoService;

        public ProfessorController(
                        ProfessorService professorService,
                        AlunoService alunoService) {

                this.professorService = professorService;
                this.alunoService = alunoService;
        }

        @PostMapping
        public ResponseEntity<ProfessorResponse> createProfessor(
                        @Valid @RequestBody CreateProfessorRequest request) {

                ProfessorResponse professor = professorService.createProfessor(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(professor);
        }

        @GetMapping("/me")
        public ResponseEntity<ProfessorResponse> getMyProfile(
                        @AuthenticationPrincipal Jwt jwt) {

                Long userId = Long.valueOf(jwt.getClaim("user_id").toString());

                ProfessorResponse response = professorService.getProfessorByUserId(userId);

                return ResponseEntity.ok(response);
        }

        @PostMapping("/me/students")
        public ResponseEntity<AlunoResponse> createStudent(
                        @AuthenticationPrincipal Jwt jwt,
                        @Valid @RequestBody CreateAlunoRequest request) {

                Long professorUserId = Long.valueOf(
                                jwt.getClaim("user_id").toString());

                AlunoResponse response = alunoService.createAluno(
                                professorUserId,
                                request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(response);
        }

        @GetMapping("/me/students")
        public ResponseEntity<List<AlunoResponse>> listMyStudents(
                        @AuthenticationPrincipal Jwt jwt) {

                Long professorUserId = Long.valueOf(
                                jwt.getClaim("user_id").toString());

                List<AlunoResponse> students = alunoService.listAlunosByProfessor(professorUserId);

                return ResponseEntity.ok(students);
        }

        @GetMapping("/me/students/{studentId}")
        public ResponseEntity<AlunoResponse> getMyStudentById(
                        @AuthenticationPrincipal Jwt jwt,
                        @PathVariable Long studentId) {

                Long professorUserId = Long.valueOf(
                                jwt.getClaim("user_id").toString());

                AlunoResponse student = alunoService.getAlunoByIdAndProfessor(
                                studentId,
                                professorUserId);

                return ResponseEntity.ok(student);
        }

}
