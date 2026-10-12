package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.CreateStudentRequest;
import com.fitsmart.dto.CreateUserRequest;
import com.fitsmart.dto.UserResponse;
import com.fitsmart.exception.EmailAlreadyExistsException;
import com.fitsmart.model.User;
import com.fitsmart.model.enums.UserRole;
import com.fitsmart.repository.UserRepository;

@Service
public class StudentService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public StudentService(
            UserRepository userRepository,
            UserService userService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse createStudent(CreateStudentRequest request) {

        CreateUserRequest userRequest = request.getUser();

        String emailNormalizado = userRequest.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmailIgnoreCase(emailNormalizado)) {
            throw new EmailAlreadyExistsException("Já existe um aluno cadastrado com este e-mail");
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

        user.setTipo_usuario(UserRole.ALUNO);
        user.setAtivo(true);
        user.setData_cadastro(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        return userService.convertToResponse(savedUser);
    }
}