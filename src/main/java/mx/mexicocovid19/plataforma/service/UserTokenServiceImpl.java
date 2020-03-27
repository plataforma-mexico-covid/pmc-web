package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.entity.UserToken;
import mx.mexicocovid19.plataforma.model.repository.UserRepository;
import mx.mexicocovid19.plataforma.model.repository.UserTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserTokenServiceImpl implements UserTokenService {
    @Autowired
    UserTokenRepository userTokenRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Map<String, Object> userTokenById(String token) throws Exception {
        Optional<UserToken> userToken = userTokenRepository.findById(token);
        if (!userToken.isPresent()) {
            throw new Exception("Token no existe.");
        }
        if (userToken.get().getExpirationDate().compareTo(new Date()) < 0) {
            throw new Exception("Token expirado.");
        }

        User user = userToken.get().getUser();
        user.setEnabled(true);
        userRepository.save(user);
        userTokenRepository.delete(userToken.get());
        return convertUserTokenToMap(userToken.get());
    }

    private Map<String, Object> convertUserTokenToMap(UserToken userToken){
        Map<String, Object> sessionDTO = new HashMap<String, Object>();
        sessionDTO.put(PROPERTY_TOKEN, userToken.getToken());
        sessionDTO.put(PROPERTY_FECHA_VIGENCIA, userToken.getExpirationDate());
        sessionDTO.put(PROPERTY_USERNAME, userToken.getUser().getUsername());
        return sessionDTO;
    }

    @Override
    public UserToken createUserTokenByUser(User user) {
        return userTokenRepository.save(generateTokenByUserAndTipo(user));
    }

    private UserToken generateTokenByUserAndTipo(User user) {
        UserToken token = new UserToken();
        Calendar fechaVigencia = Calendar.getInstance();
        fechaVigencia.add(Calendar.DAY_OF_MONTH, PROPERTY_TOKEN_VIGENCIA_DAYS);
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpirationDate(fechaVigencia.getTime());
        return token;
    }
}
