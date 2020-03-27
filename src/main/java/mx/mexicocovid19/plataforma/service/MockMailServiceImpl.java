package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.User;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Map;

@Service
@Profile("mailoff")
public class MockMailServiceImpl implements MailService {
    @Override
    public void sendValidTokenUser(User user, Map<String, Object> hTemplateVariables) throws MessagingException {

    }
}
