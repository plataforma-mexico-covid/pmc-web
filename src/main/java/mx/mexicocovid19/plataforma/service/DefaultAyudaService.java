package mx.mexicocovid19.plataforma.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;
import mx.mexicocovid19.plataforma.exception.PMCException;
import mx.mexicocovid19.plataforma.model.entity.Ayuda;
import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import mx.mexicocovid19.plataforma.model.entity.GeoLocation;
import mx.mexicocovid19.plataforma.model.entity.OrigenAyuda;
import mx.mexicocovid19.plataforma.model.entity.Peticion;
import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.repository.AyudaRepository;
import mx.mexicocovid19.plataforma.model.repository.CiudadanoRepository;
import mx.mexicocovid19.plataforma.model.repository.GeoLocationRepository;
import mx.mexicocovid19.plataforma.model.repository.PeticionRepository;
import mx.mexicocovid19.plataforma.model.repository.UserRepository;
import mx.mexicocovid19.plataforma.service.helper.GroseriasHelper;
import mx.mexicocovid19.plataforma.util.ErrorEnum;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
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
        try {
            OrigenAyuda origenAyudaValid = OrigenAyuda.valueOf(origenAyuda);
            return ayudaRepository.findByAllInsideOfKilometersByOrigenAyuda(latitude, longitude, kilometers, origenAyudaValid);
        } catch (IllegalArgumentException ex) {
            return ayudaRepository.findByAllInsideOfKilometers(latitude, longitude, kilometers);
        }
    }

    @Override
    @Transactional
    public Ayuda createAyuda(final Ayuda ayuda, final String username, final String context) throws PMCException {
        
        try {
        	User user = new User();
        	user.setUsername(username);
        	Ciudadano ciudadano = ciudadanoRepository.findByUser(user);
        	GeoLocation ubicacion = geoLocationRepository.save(ayuda.getUbicacion());
        	ayuda.setUbicacion(ubicacion);
        	ayuda.setCiudadano(ciudadano);
        	
        	if ( !GroseriasHelper.evaluarTexto(ayuda.getDescripcion()) ) {
        		Ayuda ayudaTmp = ayudaRepository.save(ayuda);
        		Map<String, Object> props = new HashMap<>();
        		props.put("nombre", ayuda.getCiudadano().getNombreCompleto());
        		mailService.sendAyudaConfirm(ciudadano.getUser(), props);
        		
        		return ayudaTmp;	
        	} else {        		
        		throw new PMCException(ErrorEnum.ERR_LENGUAJE_SOEZ, "DefaultAyudaService", "Esta prohibido el uso de lenguaje soez o vulgar.");	
        	}			
		} catch (MessagingException e) {
			log.info(e.getMessage());
			throw new PMCException(ErrorEnum.ERR_GENERICO, "DefaultAyudaService", e.getMessage());
		}
    }

    @Override
    @Transactional
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
        String contactoOfrece = ofrece.getContactos().stream()
                .map(contacto -> contacto.getTipoContacto() + " : " + contacto.getContacto() + " ")
                .reduce("", (partialString, element) -> partialString + element);
        String contactoSolicita = solicita.getContactos().stream()
                .map(contacto -> contacto.getTipoContacto() + " : " + contacto.getContacto() + " ")
                .reduce("", (partialString, element) -> partialString + element);
        Map<String, Object> props = new HashMap<>();
        props.put("ayuda", ayuda.getDescripcion());
        props.put("nombre-ofrece", ofrece.getNombreCompleto());
        props.put("email-ofrece", ofrece.getUser().getUsername());
        props.put("contacto-ofrece", contactoOfrece);
        props.put("nombre-solicita", ofrece.getNombreCompleto());
        props.put("email-solicita", ofrece.getUser().getUsername());
        props.put("contacto-solicita", contactoSolicita);
        return props;
    }
}
