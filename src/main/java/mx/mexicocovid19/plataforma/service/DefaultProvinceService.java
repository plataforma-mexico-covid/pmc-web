package mx.mexicocovid19.plataforma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mx.mexicocovid19.plataforma.model.entity.Province;
import mx.mexicocovid19.plataforma.model.repository.ProvinceRepository;

import java.util.List;

@Service
public class DefaultProvinceService implements ProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Override
    public List<Province> readProvinces() {
        return this.provinceRepository.findAll();
    }
}
