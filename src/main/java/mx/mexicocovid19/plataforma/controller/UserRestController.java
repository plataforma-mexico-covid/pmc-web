package mx.mexicocovid19.plataforma.controller;

import mx.mexicocovid19.plataforma.ApiController;
import mx.mexicocovid19.plataforma.controller.dto.UserDTO;
import mx.mexicocovid19.plataforma.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(ApiController.API_PATH_PUBLIC + "/users")
public class UserRestController {

    private UserService userService;

    public UserRestController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping( produces = {"application/json;charset=UTF-8"}, headers = "Accept=" + MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerUser(final @RequestBody UserDTO userDTO, HttpServletRequest request) throws MessagingException {
        userService.registerUser(userDTO, request.getContextPath());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping( value = { "/confirm" }, produces = {"application/json;charset=UTF-8"},
            headers = "Accept=" + MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> confirmUser(@RequestParam(value = "token") final String token) throws Exception {
        userService.confirmUser(token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
