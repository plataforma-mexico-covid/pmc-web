package mx.mexicocovid19.plataforma.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Map;

@Service
@Profile("mailoff")
public class MockMailServiceImpl implements MailService {

    @Override
    public void send(String to, String cc, Map<String, Object> variables, TipoEmailEnum tipoEmailEnum) throws MessagingException {

    }
}
