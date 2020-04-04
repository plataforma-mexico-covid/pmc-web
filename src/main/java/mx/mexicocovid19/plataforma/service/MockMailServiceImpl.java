package mx.mexicocovid19.plataforma.service;


import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("mailoff")
public class MockMailServiceImpl implements MailService {

    @Override
    public void send(String to, String cc, Map<String, Object> variables, TipoEmailEnum tipoEmailEnum) throws MessagingException {

    }

}
