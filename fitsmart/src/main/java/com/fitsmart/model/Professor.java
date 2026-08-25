package com.fitsmart.model;

import com.fitsmart.model.enums.StatusCref;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "professor")
@Getter
@Setter
@NoArgsConstructor
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true, length = 20)
    private String cref;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_cref", nullable = false)
    private StatusCref statusCref;

    public Professor(User user, String cref, StatusCref statusCref) {
        this.user = user;
        this.cref = cref;
        this.statusCref = statusCref;
    }

}
