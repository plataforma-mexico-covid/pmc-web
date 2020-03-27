package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ayuda;

import javax.mail.MessagingException;
import java.util.List;

public interface AyudaService {
    List<Ayuda> readAyudas(final String origenAyuda, final Double longitude, final Double latitude, final Integer kilometers);
    Ayuda createAyuda(final Ayuda ayuda, final String context) throws MessagingException;
}
