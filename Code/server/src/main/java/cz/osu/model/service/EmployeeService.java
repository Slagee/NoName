package cz.osu.model.service;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.model.entity.Unit;
import cz.osu.model.repository.EmployeeRepository;
import cz.osu.model.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private UnitRepository unitRepository;

    public List<Employee> list(){
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Page<Employee> loadPage(Specification<Employee> employeeSpec, Pageable pageable){
        return employeeRepository.findAll(employeeSpec, pageable);
    }

    public Employee addEmployee(EmployeeCreateDto employeeCreate, int unitNumber) {
        boolean employeeExists = employeeRepository.findByBirthNumber(employeeCreate.getBirthNumber()).isPresent();

        if(employeeExists){
            throw new IllegalStateException("Zaměstnanec s tímto rodným číslem již existuje");
        }

        Unit unit = unitRepository.findByNumber(unitNumber);
        if (unit == null) {
            throw new IllegalStateException("Zadané středisko se nepodařilo najít");
        }

        Employee employee = new Employee();
        employee.setName(employeeCreate.getName());
        employee.setSurname(employeeCreate.getSurname());
        employee.setBirthNumber(employeeCreate.getBirthNumber());
        employee.setUnitForEmployee(unit);

        return employeeRepository.save(employee);
    }
}
