package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.exception.PMCException;
import mx.mexicocovid19.plataforma.model.entity.*;
import mx.mexicocovid19.plataforma.model.repository.*;
import mx.mexicocovid19.plataforma.util.ErrorEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static mx.mexicocovid19.plataforma.service.TipoEmailEnum.*;
import static mx.mexicocovid19.plataforma.util.DateUtil.convertToLocalDateTimeViaMilisecond;

@Service
public class DefaultUserService implements UserService {
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private CiudadanoRepository ciudadanoRepository;
    private CiudadanoContactoRepository ciudadanoContactoRepository;
    private UserTokenRepository userTokenRepository;
    private UserTokenService userTokenService;
    private MailService mailService;

    @Autowired
    PasswordEncoder passwordEncoder;

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
    @Transactional
    public void registerUser(final UserDTO userDTO, final String context) throws Exception {
        User userTmp = userRepository.findByUsername(userDTO.getUsername());
        if(userTmp != null) {
            throw new Exception(String.format("Este correo '%s' ya fue utilizado por otra cuenta.", userDTO.getUsername()));
        }
        final User user = userRepository.save(getUser(userDTO));
        final UserRole userRole = userRoleRepository.save(getUserRole(user));
        final Ciudadano ciudadano = ciudadanoRepository.save(getCiudadano(userDTO, user));
        ciudadanoContactoRepository.saveAll(getCiudadanoContactos(userDTO, ciudadano));
        UserToken token = userTokenService.createUserTokenByUser(user);
        sendMailToken(token, context, ciudadano.getNombre());
    }

    private void sendMailToken(UserToken userToken, String context, String nombre) throws MessagingException {
        Map<String, Object> props = new HashMap<>();
        props.put("nombre", nombre);
        props.put("link", context + "api/v1/public/users/confirm?token=" + userToken.getToken());

        mailService.send(userToken.getUser().getUsername(), userToken.getUser().getUsername(), props, REGISTRO_USUARIO);
    }


    private User getUser(final UserDTO userDTO) {
        final User user = new User();
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
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
    @Transactional
    public void confirmUser(final String token) throws Exception {
        final Optional<UserToken> userTokenOpt = userTokenRepository.findById(token);
        if (!userTokenOpt.isPresent()) {
            throw new PMCException(ErrorEnum.ERR_GENERICO, "DefaultUserService", "Token Invalido");
        }
        UserToken userToken = userTokenOpt.get();
        if(isExpired(userToken.getExpirationDate())) {
            throw new PMCException(ErrorEnum.ERR_GENERICO, "DefaultUserService", "Token expirado");
        }
        userToken.getUser().setValidated(true);
        userRepository.save(userToken.getUser());
        userToken.setValidated(true);
        userTokenRepository.save(userToken);
    }

    private boolean isExpired(final Date expirationDate) {
        return LocalDateTime.now().isAfter(convertToLocalDateTimeViaMilisecond(expirationDate));
    }

}
