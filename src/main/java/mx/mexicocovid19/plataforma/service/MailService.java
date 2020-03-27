package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.User;

import javax.mail.MessagingException;
import java.util.Map;

public interface MailService {
    void sendValidTokenUser(User user, Map<String, Object> hTemplateVariables) throws MessagingException;
    void sendAyudaConfirm(User user, Map<String, Object> hTemplateVariables) throws MessagingException;
    void sendAyudaMatchConfirm(User user, User requester, Map<String, Object> hTemplateVariables) throws MessagingException;
}
