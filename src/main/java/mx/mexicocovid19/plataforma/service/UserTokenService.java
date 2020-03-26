package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.User;

public interface UserTokenService {
    void createUserToken(User user);
}
