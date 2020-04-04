package mx.mexicocovid19.plataforma.service.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;
import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.exception.PMCException;
import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.repository.UserRepository;
import mx.mexicocovid19.plataforma.util.ErrorEnum;

@Log4j2
@Service
public class DefaultUserServiceHelper {
	
	@Autowired
	private UserRepository userRepository;
	
	public void validaRegistroUsuario( final UserDTO userDTO ) throws PMCException {
		
    	if ( userDTO.getUsername() == null || userDTO.getUsername().isEmpty() ) {
			throw new PMCException(ErrorEnum.ERR_REGISTRO_CIUDADANO, getClass().getName(), "el Usuario");
    	}
    	
    	User userTmp = userRepository.findByUsername(userDTO.getUsername());
    	if(userTmp != null) {
    		throw new PMCException(ErrorEnum.ERR_UNAVAILABLE_ACCOUNT, getClass().getName(),
    				String.format(ErrorEnum.ERR_UNAVAILABLE_ACCOUNT.getDescription(), userDTO.getUsername()));
    	}
    	
    	if ( userDTO.getNombre() == null || userDTO.getNombre().isEmpty() ) {
			throw new PMCException(ErrorEnum.ERR_REGISTRO_CIUDADANO, getClass().getName(), "el Nombre");
    	}
    	
    	if ( userDTO.getPaterno() == null || userDTO.getPaterno().isEmpty() ) {
			throw new PMCException(ErrorEnum.ERR_REGISTRO_CIUDADANO, getClass().getName(), "el Apellido Paterno");	
    	}
    	
    	if ( userDTO.getMaterno() == null || userDTO.getMaterno().isEmpty() ) {
			throw new PMCException(ErrorEnum.ERR_REGISTRO_CIUDADANO, getClass().getName(), "el Apellido Materno");
    	}
    	
    	if ( !PasswordHelper.passwordIsValid(userDTO.getPassword()) ) {
			throw new PMCException(ErrorEnum.ERR_INVALID_PASSWORD, getClass().getName());
    	}
    	
    	if ( userDTO.getContactInfos() == null || userDTO.getContactInfos().isEmpty() ) {
			throw new PMCException(ErrorEnum.ERR_REGISTRO_CIUDADANO, getClass().getName(), "la Información de Contacto");        		
    	}
	}

}
