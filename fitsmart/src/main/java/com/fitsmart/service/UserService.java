package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.fitsmart.repository.UserRepository;
import com.fitsmart.dto.CreateUserRequest;
import com.fitsmart.dto.UserResponse;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.User;
import com.fitsmart.model.enums.UserRole;
import com.fitsmart.dto.UpdateUserRequest;
import java.util.Locale;
import com.fitsmart.dto.UpdatePasswordRequest;
import com.fitsmart.exception.InvalidPasswordException;
import com.fitsmart.dto.UpdateEmailRequest;
import com.fitsmart.exception.InvalidEmailException;

import com.fitsmart.exception.EmailAlreadyExistsException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public UserResponse createUser(CreateUserRequest request) {

        User user = new User();
        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyExistsException(
                    "Já existe um usuário cadastrado com este e-mail");
        }

        user.setNome(request.nome());
        user.setSobrenome(request.sobrenome());
        user.setEmail(request.email());
        user.setSenha(passwordEncoder.encode(request.senha()));
        user.setTelefone(request.telefone());
        user.setData_nascimento(request.data_nascimento());
        user.setSexo(request.sexo());
        user.setCep(request.cep());
        user.setLogradouro(request.logradouro());
        user.setNumero_residencial(request.numero_residencial());
        user.setComplemento(request.complemento());

        user.setAtivo(true);
        user.setTipo_usuario(UserRole.ALUNO);
        user.setData_cadastro(LocalDateTime.now());

        User newUser = userRepository.save(user);

        return convertToResponse(newUser);
    }

    private User findUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }

    public UserResponse getUserByid(Long id) {
        User user = findUserById(id);

        return convertToResponse(user);
    }

    public List<UserResponse> listUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    public void deleteUser(Long id) {

        User user = findUserById(id);

        userRepository.delete(user);
    }

    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request) {

        User existingUser = findUserById(id);

        if (request.nome() != null) {
            existingUser.setNome(request.nome());
        }

        if (request.sobrenome() != null) {
            existingUser.setSobrenome(request.sobrenome());
        }

        if (request.telefone() != null) {
            existingUser.setTelefone(request.telefone());
        }

        if (request.data_nascimento() != null) {
            existingUser.setData_nascimento(request.data_nascimento());
        }

        if (request.sexo() != null) {
            existingUser.setSexo(request.sexo());
        }

        if (request.cep() != null) {
            existingUser.setCep(request.cep());
        }

        if (request.logradouro() != null) {
            existingUser.setLogradouro(request.logradouro());
        }

        if (request.numero_residencial() != null) {
            existingUser.setNumero_residencial(
                    request.numero_residencial());
        }

        if (request.complemento() != null) {
            existingUser.setComplemento(request.complemento());
        }

        User updatedUser = userRepository.save(existingUser);

        return convertToResponse(updatedUser);
    }

    public void updatePassword(
            Long id,
            UpdatePasswordRequest request) {

        User user = findUserById(id);

        boolean currentPasswordMatches = passwordEncoder.matches(
                request.senhaAtual(),
                user.getSenha());

        if (!currentPasswordMatches) {
            throw new InvalidPasswordException(
                    "A senha atual está incorreta");
        }

        if (!request.novaSenha()
                .equals(request.confirmacaoNovaSenha())) {

            throw new InvalidPasswordException(
                    "A confirmação da nova senha não corresponde");
        }

        boolean newPasswordIsCurrent = passwordEncoder.matches(
                request.novaSenha(),
                user.getSenha());

        if (newPasswordIsCurrent) {
            throw new InvalidPasswordException(
                    "A nova senha deve ser diferente da senha atual");
        }

        String encodedPassword = passwordEncoder.encode(
                request.novaSenha());

        user.setSenha(encodedPassword);

        userRepository.save(user);
    }

    public UserResponse convertToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getNome(),
                user.getSobrenome(),
                user.getEmail(),
                user.getTelefone(),
                user.getData_nascimento(),
                user.getSexo(),
                user.getTipo_usuario(),
                user.isAtivo(),
                user.getData_cadastro(),
                user.getCep(),
                user.getLogradouro(),
                user.getNumero_residencial(),
                user.getComplemento());
    }

    public UserResponse updateEmail(
            Long id,
            UpdateEmailRequest request) {

        User user = findUserById(id);

        boolean passwordMatches = passwordEncoder.matches(
                request.senhaAtual(),
                user.getSenha());

        if (!passwordMatches) {
            throw new InvalidPasswordException(
                    "A senha atual está incorreta");
        }

        String newEmail = request.novoEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (newEmail.equalsIgnoreCase(user.getEmail())) {
            throw new InvalidEmailException(
                    "O novo e-mail deve ser diferente do e-mail atual");
        }

        if (userRepository.existsByEmailIgnoreCase(newEmail)) {
            throw new EmailAlreadyExistsException(
                    "Já existe um usuário cadastrado com este e-mail");
        }

        user.setEmail(newEmail);

        User updatedUser = userRepository.save(user);

        return convertToResponse(updatedUser);
    }

}
