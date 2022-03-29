package cz.osu.model.service;

import cz.osu.model.entity.Unit;
import cz.osu.model.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UnitService {
    @Autowired
    private UnitRepository unitRepository;

    public Page<Unit> list(Pageable pageable) {
        return unitRepository.findAll(pageable);
    }

    public Unit getById(Long id) {
        return unitRepository.findById(id).orElse(null);
    }
}
