package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import mx.mexicocovid19.plataforma.model.entity.CiudadanoContacto;
import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.entity.UserRole;
import mx.mexicocovid19.plataforma.model.repository.CiudadanoContactoRepository;
import mx.mexicocovid19.plataforma.model.repository.CiudadanoRepository;
import mx.mexicocovid19.plataforma.model.repository.UserRepository;
import mx.mexicocovid19.plataforma.model.repository.UserRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultUserService implements UserService {
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private CiudadanoRepository ciudadanoRepository;
    private CiudadanoContactoRepository ciudadanoContactoRepository;
    private UserTokenService userTokenService;

    public DefaultUserService(final UserRepository userRepository, final UserRoleRepository userRoleRepository,
            final CiudadanoRepository ciudadanoRepository,
            final CiudadanoContactoRepository ciudadanoContactoRepository, final UserTokenService userTokenService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.ciudadanoRepository = ciudadanoRepository;
        this.ciudadanoContactoRepository = ciudadanoContactoRepository;
        this.userTokenService = userTokenService;
    }

    @Override
    public void registerUser(final UserDTO userDTO) {
        final User user = userRepository.save(getUser(userDTO));
        final UserRole userRole = userRoleRepository.save(getUserRole(user));
        final Ciudadano ciudadano = ciudadanoRepository.save(getCiudadano(userDTO, user));
        ciudadanoContactoRepository.saveAll(getCiudadanoContactos(userDTO, ciudadano));
        userTokenService.createUserToken(user);
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
}
