package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;

import javax.mail.MessagingException;

public interface UserService {
    void registerUser(UserDTO userDTO, String context) throws Exception;
    void confirmUser(String token) throws Exception;
}
