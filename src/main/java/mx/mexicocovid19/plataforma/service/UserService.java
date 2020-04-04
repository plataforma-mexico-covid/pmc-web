package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.ChangePasswordDTO;
import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.model.entity.User;

public interface UserService {
    void registerUser(UserDTO userDTO, String context) throws Exception;
    void confirmUser(String token) throws Exception;
    
    void recoveryPassword(String email, String context) throws Exception;
    void changePassword(ChangePasswordDTO changePasswordDTO) throws Exception;
    void changePassword(User user, String password, String confirmation) throws Exception;
}
