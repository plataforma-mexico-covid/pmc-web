package mx.mexicocovid19.plataforma;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@Profile("localdb")
public class PlataformaAppTests {

	PasswordEncoder encoder = new BCryptPasswordEncoder();

	@Test
	public void contextLoads() {
        String pass = encoder.encode("rodriG0a");
        String cryp = "$2a$10$N2JSYZidy.d40OTF5Y5p9e7YVToSDaKxxKcurxULpUt.du6vUzPiu";
        assertTrue(encoder.matches("rodriG0a", cryp));
	}

}
