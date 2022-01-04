package cz.osu.model.service;

import cz.osu.model.entity.Unit;
import cz.osu.model.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {
    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> list() {
        return unitRepository.findAll();
    }

    public Unit getById(Long id) {
        return unitRepository.findById(id).orElse(null);
    }
}
