package cz.osu.model.repository;

import cz.osu.model.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Unit findByNumber(int number);
}