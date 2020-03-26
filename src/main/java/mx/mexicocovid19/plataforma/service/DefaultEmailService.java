package mx.mexicocovid19.plataforma.service;

import org.springframework.stereotype.Service;

@Service
public class DefaultEmailService implements EmailService {
    @Override
    public void sendMessage(final String to, final String subject, final String message) {

    }
}
