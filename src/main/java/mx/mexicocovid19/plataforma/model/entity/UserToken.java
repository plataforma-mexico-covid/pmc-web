package mx.mexicocovid19.plataforma.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "USER_TOKEN")
public class UserToken {

 	@Id
	@Column(name = "username", unique = true, nullable = false, length = 45)
	private String username;
	@Column(name = "token", nullable = false, length = 60)
	private String token;
	@Column(name = "validated", nullable = false)
	private boolean validated;
	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;
}