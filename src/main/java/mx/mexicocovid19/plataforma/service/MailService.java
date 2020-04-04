package mx.mexicocovid19.plataforma.service;

import javax.mail.MessagingException;
import java.util.Map;

public interface MailService {
    void send(String to, String cc, Map<String, Object> variables, TipoEmailEnum tipoEmailEnum) throws MessagingException;
}
