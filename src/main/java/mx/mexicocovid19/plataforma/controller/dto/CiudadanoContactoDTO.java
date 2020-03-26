package mx.mexicocovid19.plataforma.controller.dto;

import lombok.Getter;
import lombok.Setter;
import mx.mexicocovid19.plataforma.model.entity.TipoContacto;

@Getter
@Setter
public class CiudadanoContactoDTO {
    private Integer id;
    private TipoContacto tipoContacto;
    private String contacto;
}
