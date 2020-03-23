package mx.mexicocovid19.plataforma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mx.mexicocovid19.plataforma.model.entity.Municipality;
import mx.mexicocovid19.plataforma.model.entity.Province;
import mx.mexicocovid19.plataforma.model.repository.MunicipalityRepository;

import java.util.List;

@Service
public class DefaultMunicipalityService implements MunicipalityService {

    @Autowired
    private MunicipalityRepository municipalityRepository;

    @Override
    public List<Municipality> readMunicipalitiesByProvince(final Integer idProvince) {
        final Province province = new Province();
        province.setId(idProvince);
        return this.municipalityRepository.findAllByProvince(province);
    }
}
