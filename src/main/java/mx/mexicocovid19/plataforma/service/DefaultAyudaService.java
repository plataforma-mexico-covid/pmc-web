package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.*;
import mx.mexicocovid19.plataforma.model.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DefaultAyudaService implements AyudaService {

    @Autowired
    private AyudaRepository ayudaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GeoLocationRepository geoLocationRepository;

    @Autowired
    private CiudadanoRepository ciudadanoRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private PeticionRepository peticionRepository;

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

    @Override
    public void matchAyuda(Integer idAyuda, String username, String context) throws MessagingException {
        Ayuda ayuda = ayudaRepository.getOne(idAyuda);
        User user = new User();
        user.setUsername(username);
        Optional<Ciudadano> ciudadanoAyuda = ciudadanoRepository.findById(ayuda.getCiudadano().getId());
        Ciudadano ciudadano = ciudadanoRepository.findByUser(user);
        Peticion peticion = new Peticion();
        peticion.setAyuda(ayuda);
        peticion.setCiudadano(ciudadano);
        peticion.setFechaPeticion(LocalDateTime.now());
        peticionRepository.save(peticion);
        Map<String, Object> props = createInfoToEmail(ayuda, ciudadanoAyuda.get(), ciudadano);
        mailService.sendAyudaMatchConfirm(ciudadanoAyuda.get().getUser(), user, props);
    }

    private Map<String, Object> createInfoToEmail(Ayuda ayuda, Ciudadano ofrece, Ciudadano solicita){
        Map<String, Object> props = new HashMap<>();
        props.put("ayuda", ayuda.getDescripcion());
        props.put("nombre-ofrece", ofrece.getNombreCompleto());
        props.put("email-ofrece", ofrece.getUser().getUsername());
        props.put("contacto-ofrece", ofrece.getContactos());
        props.put("nombre-solicita", ofrece.getNombreCompleto());
        props.put("email-solicita", ofrece.getUser().getUsername());
        props.put("contacto-solicita", ofrece.getContactos());
        return props;
    }
}
