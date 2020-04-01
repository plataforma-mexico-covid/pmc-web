package mx.mexicocovid19.plataforma.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import mx.mexicocovid19.plataforma.model.entity.TipoContacto;

@Getter
@Setter
@AllArgsConstructor
public class UserContactInfo {
    private TipoContacto tipoContacto;
    private String contacto;

    @Override
    public boolean equals(Object obj) {
        if(obj == null) return false;
        if(obj instanceof UserContactInfo) {
            return contacto.equals(((UserContactInfo) obj).getContacto());
        }
        return false;
    }
}
