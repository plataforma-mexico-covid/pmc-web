package mx.mexicocovid19.plataforma.service;

public interface EmailService {
    void sendMessage(String to, String subject, String message);
}
