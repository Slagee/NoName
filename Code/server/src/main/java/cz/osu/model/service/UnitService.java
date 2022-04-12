package cz.osu.model.service;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.model.entity.Unit;
import cz.osu.model.entity.UnitCreateUpdateDto;
import cz.osu.model.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.Optional;

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

    public Unit updateUnit(UnitCreateUpdateDto unitUpdate, Long id) {
        System.out.println(unitUpdate.getName()+ " " +unitUpdate.getNumber());

        Optional<Unit> updatingUnit = unitRepository.findById(id);
        if (updatingUnit.isEmpty())
            throw new IllegalStateException("Vybrané středisko se nepodařilo najít");

        Optional<Unit> unitExists = unitRepository.findByName(unitUpdate.getName());
        if (unitExists.isPresent() && !unitExists.get().getName().equals(updatingUnit.get().getName()))
            throw new IllegalStateException("Středisko s tímto jménem již existuje");

        unitExists = unitRepository.findByNumber(unitUpdate.getNumber());
        if (unitExists.isPresent() && !unitExists.get().getNumber().equals(updatingUnit.get().getNumber()))
            throw new IllegalStateException("Středisko s tímto číslem již existuje");

        Unit unit = updatingUnit.get();
        unit.setName(unitUpdate.getName());
        unit.setNumber(unitUpdate.getNumber());

        return unitRepository.save(unit);
    }

    public Unit addUnit(UnitCreateUpdateDto unitCreate) {
        boolean unitExists = unitRepository.findByNumber(unitCreate.getNumber()).isPresent();
        if (unitExists || unitCreate.getNumber().equals("0"))
            throw new IllegalStateException("Středisko s tímto číslem již existuje");

        unitExists = unitRepository.findByName(unitCreate.getName()).isPresent();
        if (unitExists  || unitCreate.getName().equals(""))
            throw new IllegalStateException("Středisko s tímto jménem již existuje");

        Unit unit = new Unit();
        unit.setNumber(unitCreate.getNumber());
        unit.setName(unitCreate.getName());

        return unitRepository.save(unit);
    }

    public void deleteUnit(Long id) {
        Optional<Unit> unitExists = unitRepository.findById(id);
        if (unitExists.isEmpty())
        {
            throw new IllegalStateException("Vybrané středisko se nepodařilo najít");
        }

        Unit unit = unitExists.get();

        try {
            unitRepository.delete(unit);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
