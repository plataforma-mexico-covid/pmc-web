package mx.mexicocovid19.plataforma.config.security;

import mx.mexicocovid19.plataforma.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import mx.mexicocovid19.plataforma.model.entity.User;

/**
 * Created by stephan on 20.03.16.
 */
@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User usuario = userRepository.findByUsername(username);

        if (usuario == null) {
            throw new UsernameNotFoundException(String.format("Ningun usuario encontrado con username '%s'.", username));
        } else if (!usuario.isEnabled()) {
            throw new UsernameNotFoundException(String.format("Usuario inactivo '%s'.", username));
        } else if (!usuario.isValidated()) {
            throw new UsernameNotFoundException(String.format("Usuario necesita validar su email '%s'.", username));
        } else {
            return JwtUserFactory.create(usuario);
        }
    }
}
