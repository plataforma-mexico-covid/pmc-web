package mx.mexicocovid19.plataforma.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
	
	public UserDTO(){}
	
	
    private String username;
    private String password;
    private String nombre;
    private String paterno;
    private String materno;
    private Set<UserContactInfo> contactInfos;
}
