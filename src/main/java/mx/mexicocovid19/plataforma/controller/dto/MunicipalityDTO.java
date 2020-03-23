package mx.mexicocovid19.plataforma.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MunicipalityDTO {
    private int id;
    private String name;
    private String fullname;
    private String idExternal;
}
