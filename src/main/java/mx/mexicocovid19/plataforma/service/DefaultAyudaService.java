package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ayuda;
import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import mx.mexicocovid19.plataforma.model.entity.GeoLocation;
import mx.mexicocovid19.plataforma.model.repository.AyudaRepository;
import mx.mexicocovid19.plataforma.model.repository.CiudadanoRepository;
import mx.mexicocovid19.plataforma.model.repository.GeoLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DefaultAyudaService implements AyudaService {

    @Autowired
    private AyudaRepository ayudaRepository;

    @Autowired
    private GeoLocationRepository geoLocationRepository;

    @Autowired
    private CiudadanoRepository ciudadanoRepository;

    @Autowired
    private MailService mailService;

    @Override
    public List<Ayuda> readAyudas(String origenAyuda, Double longitude, Double latitude, Integer kilometers) {
        return ayudaRepository.findByAllInsideOfKilometers(latitude, longitude, kilometers);
    }

    @Override
    public Ayuda createAyuda(final Ayuda ayuda, final String context) throws MessagingException {
        GeoLocation ubicacion = geoLocationRepository.save(ayuda.getUbicacion());
        ayuda.setUbicacion(ubicacion);
        Ayuda ayudaTmp = ayudaRepository.save(ayuda);
        Map<String, Object> props = new HashMap<>();
        props.put("nombre", ayuda.getCiudadano().getNombreCompleto());
        Optional<Ciudadano> ciudadano = ciudadanoRepository.findById(ayudaTmp.getCiudadano().getId());
        ayudaTmp.setCiudadano(ciudadano.get());
        mailService.sendAyudaConfirm(ciudadano.get().getUser(), props);
        return ayudaTmp;
    }
}
