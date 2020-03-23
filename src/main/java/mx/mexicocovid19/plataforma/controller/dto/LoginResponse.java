package mx.mexicocovid19.plataforma.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Setter
@Getter
@ToString
public class LoginResponse {
    private String username;
    private String email;
    private List<GrantedAuthority> roles;
    private String token;
}
