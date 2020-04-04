package mx.mexicocovid19.plataforma.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChangePasswordDTO {
	
	public ChangePasswordDTO(){}
	
    private String password;
    private String confirmation;
    private String token;
}
