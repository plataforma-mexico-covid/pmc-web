package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.entity.UserToken;
import mx.mexicocovid19.plataforma.model.repository.UserTokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class DefaultUserTokenService implements UserTokenService {
    private static int EXPIRITY_TIME_IN_MINUTES = 24 * 60;

    private EmailService emailService;
    private UserTokenRepository userTokenRepository;

    public DefaultUserTokenService(final EmailService emailService,
            final UserTokenRepository userTokenRepository) {
        this.emailService = emailService;
        this.userTokenRepository = userTokenRepository;
    }

    @Override
    public void createUserToken(final User user) {
        final UserToken userToken = getUserToken(user);
        userTokenRepository.save(userToken);
        emailService.sendMessage(user.getUsername(), "Confirma tu registro", getMessage(userToken));
    }

    private UserToken getUserToken(final User user) {
        final UserToken userToken = new UserToken();
        userToken.setExpirationDate(getExpirationDate());
        userToken.setToken(getToken());
        userToken.setUsername(user.getUsername());
        return userToken;
    }

    private LocalDateTime getExpirationDate() {
        return LocalDateTime.now().plus(EXPIRITY_TIME_IN_MINUTES, ChronoUnit.MINUTES);
    }

    private String getToken() {
        return UUID.randomUUID().toString();
    }

    private String getMessage(final UserToken userToken) {
        return "http://localhost:8090/users/confirm?token=" + userToken.getToken();
    }
}
