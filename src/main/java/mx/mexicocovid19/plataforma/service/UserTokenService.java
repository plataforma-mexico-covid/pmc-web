package mx.mexicocovid19.plataforma.service;

import java.util.Map;

import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.entity.UserToken;
import mx.mexicocovid19.plataforma.service.enums.EnumTokenType;

public interface UserTokenService {
    int PROPERTY_TOKEN_VIGENCIA_DAYS    = 2;

    String PROPERTY_TOKEN               = "token";
    String PROPERTY_FECHA_VIGENCIA      = "fechaVigencia";
    String PROPERTY_USERNAME            = "username";

    Map<String,Object> userTokenById(String token) throws Exception;

    UserToken createUserTokenByUser(User user, EnumTokenType type);
}
