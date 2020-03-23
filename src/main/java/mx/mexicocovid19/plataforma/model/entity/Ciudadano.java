package mx.mexicocovid19.plataforma.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "CIUDADANO")
public class Ciudadano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "NOMBRE")
    private String nombre;
    @Column(name = "PATERNO")
    private String paterno;
    @Column(name = "MATERNO")
    private String materno;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USERNAME", nullable = false)
    private User user;
    @Column(name = "ACTIVE")
    private Boolean active;
}