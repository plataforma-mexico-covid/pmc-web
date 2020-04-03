package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;

public interface UserService {
    void registerUser(UserDTO userDTO, String urlConfirmToken) throws Exception;
    void confirmUser(String token) throws Exception;
}
