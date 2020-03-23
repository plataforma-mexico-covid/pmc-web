package mx.mexicocovid19.plataforma.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class LoginRequest {
    private String username;
    private String password;
}
