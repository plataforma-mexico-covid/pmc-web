package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;

public interface UserService {
    void registerUser(UserDTO userDTO);
    void confirmUser(String token);
}
