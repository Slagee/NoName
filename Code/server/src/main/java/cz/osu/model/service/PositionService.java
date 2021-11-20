package cz.osu.model.service;

import cz.osu.model.entity.Position;
import cz.osu.model.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PositionService {
    @Autowired
    private PositionRepository positionRepository;

    public List<Position> list(){
        return positionRepository.findAll();
    }

    public Position getById(Long id) {
        return positionRepository.findById(id).orElse(null);
    }
}
