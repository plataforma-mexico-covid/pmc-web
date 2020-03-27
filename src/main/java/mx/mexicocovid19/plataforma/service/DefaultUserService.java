package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.model.entity.*;
import mx.mexicocovid19.plataforma.model.repository.*;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DefaultUserService implements UserService {
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private CiudadanoRepository ciudadanoRepository;
    private CiudadanoContactoRepository ciudadanoContactoRepository;
    private UserTokenRepository userTokenRepository;
    private UserTokenService userTokenService;
    private MailService mailService;

    public DefaultUserService(final UserRepository userRepository, final UserRoleRepository userRoleRepository,
            final CiudadanoRepository ciudadanoRepository,
            final CiudadanoContactoRepository ciudadanoContactoRepository,
            final UserTokenRepository userTokenRepository, final UserTokenService userTokenService,
            final MailService mailService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.ciudadanoRepository = ciudadanoRepository;
        this.ciudadanoContactoRepository = ciudadanoContactoRepository;
        this.userTokenRepository = userTokenRepository;
        this.userTokenService = userTokenService;
        this.mailService = mailService;
    }

    @Override
    public void registerUser(final UserDTO userDTO, final String context) throws MessagingException {
        final User user = userRepository.save(getUser(userDTO));
        final UserRole userRole = userRoleRepository.save(getUserRole(user));
        final Ciudadano ciudadano = ciudadanoRepository.save(getCiudadano(userDTO, user));
        ciudadanoContactoRepository.saveAll(getCiudadanoContactos(userDTO, ciudadano));
        UserToken token = userTokenService.createUserTokenByUser(user);
        sendMailToken(token, context);
    }

    private void sendMailToken(UserToken userToken, String context) throws MessagingException {
        Map<String, Object> props = new HashMap<>();
        props.put("action", "ACTIVAR USUARIO");
        props.put("link", context + "#confirm/" + userToken.getToken());

        mailService.sendValidTokenUser(userToken.getUser(), props);
    }


    private User getUser(final UserDTO userDTO) {
        final User user = new User();
        user.setEnabled(true);
        user.setPassword(userDTO.getPassword());
        user.setUsername(userDTO.getUsername());
        user.setValidated(false);
        return user;
    }

    private UserRole getUserRole(final User user) {
        final UserRole userRole = new UserRole();
        userRole.setRole("CITIZEN");
        userRole.setUser(user);
        return userRole;
    }

    private Ciudadano getCiudadano(final UserDTO userDTO, final User user) {
        final Ciudadano ciudadano = new Ciudadano();
        ciudadano.setActive(true);
        ciudadano.setMaterno(userDTO.getMaterno());
        ciudadano.setNombre(userDTO.getNombre());
        ciudadano.setPaterno(userDTO.getPaterno());
        ciudadano.setUser(user);
        return ciudadano;
    }

    private List<CiudadanoContacto> getCiudadanoContactos(final UserDTO userDTO, final Ciudadano ciudadano) {
        return userDTO.getContactInfos().stream().map(userContactInfo -> {
            final CiudadanoContacto ciudadanoContacto = new CiudadanoContacto();
            ciudadanoContacto.setCiudadano(ciudadano);
            ciudadanoContacto.setContacto(userContactInfo.getContacto());
            ciudadanoContacto.setTipoContacto(userContactInfo.getTipoContacto());
            return ciudadanoContacto;
        }).collect(Collectors.toList());
    }

    @Override
    public void confirmUser(final String token) throws Exception {
        userTokenService.userTokenById(token);
    }

}
