package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitsmart.dto.AlunoResponse;
import com.fitsmart.dto.CreateAlunoRequest;
import com.fitsmart.dto.CreateUserRequest;
import com.fitsmart.exception.EmailAlreadyExistsException;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Aluno;
import com.fitsmart.model.Professor;
import com.fitsmart.model.User;
import com.fitsmart.model.enums.UserRole;
import com.fitsmart.repository.AlunoRepository;
import com.fitsmart.repository.ProfessorRepository;
import com.fitsmart.repository.UserRepository;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AlunoService(
            AlunoRepository alunoRepository,
            ProfessorRepository professorRepository,
            UserRepository userRepository,
            UserService userService,
            PasswordEncoder passwordEncoder) {

        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AlunoResponse createAluno(
            Long professorUserId,
            CreateAlunoRequest request) {

        Professor professor = professorRepository
                .findByUser_Id(professorUserId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Professor não encontrado"));

        CreateUserRequest userRequest = request.getUser();

        String emailNormalizado = userRequest.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmailIgnoreCase(emailNormalizado)) {
            throw new EmailAlreadyExistsException(
                    "Já existe um usuário cadastrado com este e-mail");
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

        Aluno aluno = new Aluno(savedUser, professor);

        Aluno savedAluno = alunoRepository.save(aluno);

        return convertToResponse(savedAluno);

    }

    private AlunoResponse convertToResponse(Aluno aluno) {
        return new AlunoResponse(
                aluno.getId(),
                userService.convertToResponse(aluno.getUser()),
                aluno.getProfessor().getId());
    }

    @Transactional(readOnly = true)
    public List<AlunoResponse> listAlunosByProfessor(Long professorUserId) {

        return alunoRepository
                .findAllByProfessor_User_Id(professorUserId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AlunoResponse getAlunoByIdAndProfessor(
            Long alunoId,
            Long professorUserId) {

        Aluno aluno = alunoRepository
                .findByIdAndProfessor_User_Id(alunoId, professorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));

        return convertToResponse(aluno);
    }

}
