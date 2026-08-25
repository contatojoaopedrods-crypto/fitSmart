package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.CreateProfessorRequest;
import com.fitsmart.dto.CreateUserRequest;
import com.fitsmart.dto.ProfessorResponse;
import com.fitsmart.exception.CrefAlreadyExistsException;
import com.fitsmart.exception.EmailAlreadyExistsException;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Professor;
import com.fitsmart.model.User;
import com.fitsmart.model.enums.StatusCref;
import com.fitsmart.model.enums.UserRole;
import com.fitsmart.repository.ProfessorRepository;
import com.fitsmart.repository.UserRepository;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public ProfessorService(
            ProfessorRepository professorRepository,
            UserRepository userRepository,
            UserService userService,
            PasswordEncoder passwordEncoder) {

        this.professorRepository = professorRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ProfessorResponse createProfessor(CreateProfessorRequest request) {

        CreateUserRequest userRequest = request.getUser();

        String emailNormalizado = userRequest.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        String crefNormalizado = request.getCref()
                .replace("\\s+", "")
                .toUpperCase(Locale.ROOT);

        if (userRepository.existsByEmailIgnoreCase(emailNormalizado)) {
            throw new EmailAlreadyExistsException("Já existe um professor cadastrado com essse e-mail");

        }

        if (professorRepository.existsByCrefIgnoreCase(crefNormalizado)) {
            throw new CrefAlreadyExistsException("Já existe um profesor cadastrado com este CREF");
        }

        User user = new User();

        user.setNome(userRequest.nome());
        user.setSobrenome(userRequest.sobrenome());
        user.setEmail(emailNormalizado);
        user.setSenha(passwordEncoder.encode(userRequest.senha()));
        user.setTelefone(userRequest.telefone());
        user.setData_nascimento(userRequest.data_nascimento());
        user.setSexo(userRequest.sexo());
        user.setCep(userRequest.cep());
        user.setLogradouro(userRequest.logradouro());
        user.setNumero_residencial(userRequest.numero_residencial());
        user.setComplemento(userRequest.complemento());

        user.setTipo_usuario(UserRole.PROFESSOR);
        user.setAtivo(true);
        user.setData_cadastro(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        Professor professor = new Professor(
                savedUser,
                crefNormalizado,
                StatusCref.VALIDACAO_BASICA);

        Professor savedProfessor = professorRepository.save(professor);

        return new ProfessorResponse(
                savedProfessor.getId(),
                userService.convertToResponse(savedProfessor.getUser()),
                savedProfessor.getCref(),
                savedProfessor.getStatusCref());
    }

    public ProfessorResponse getProfessorByUserId(Long userId) {

        Professor professor = professorRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));

        return convertToResponse(professor);
    }

    private ProfessorResponse convertToResponse(Professor professor) {
        return new ProfessorResponse(
                professor.getId(),
                userService.convertToResponse(professor.getUser()),
                professor.getCref(),
                professor.getStatusCref());
    }
}
