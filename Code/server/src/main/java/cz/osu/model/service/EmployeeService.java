package cz.osu.model.service;

import cz.osu.model.entity.Document;
import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.model.entity.Unit;
import cz.osu.model.repository.DocumentRepository;
import cz.osu.model.repository.EmployeeRepository;
import cz.osu.model.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DocumentRepository documentRepository;

    public List<Employee> list(){
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    /*
    public Page<Employee> loadPage(Specification<Employee> employeeSpec, Pageable pageable){
        return employeeRepository.findAll(employeeSpec, pageable);
    }*/

    public Page<Employee> employeesPageSearch(String search, Pageable pageable) {
        if (search == null || search.isEmpty()) {
            return employeeRepository.findAll(pageable);
        } else if (search.contains(" ")) {
            String[] s = search.split(" ");
            return employeeRepository.findAllByNameContainingAndSurnameContaining(s[0], s[1], pageable);
        } else {
            return employeeRepository.findAllByNameContainingOrSurnameContaining(search, search, pageable);
        }
    }

    public Employee updateEmployee(EmployeeCreateDto employeeUpdate, Long id) {
        Optional<Employee> employeeExists = employeeRepository.findById(id);
        if (employeeExists.isEmpty())
        {
            throw new IllegalStateException("Vybraného zaměstnance se nepodařilo najít");
        }
        Employee employee = employeeExists.get();
        employee.setName(employeeUpdate.getName());
        employee.setSurname(employeeUpdate.getSurname());
        employee.setBirthNumber(employeeUpdate.getBirthNumber());
        employee.setUnitForEmployee(employeeUpdate.getEmployeeUnit());

        return employeeRepository.save(employee);
    }

    public Employee addEmployee(EmployeeCreateDto employeeCreate) {
        boolean employeeExists = employeeRepository.findByBirthNumber(employeeCreate.getBirthNumber()).isPresent();

        if(employeeExists){
            throw new IllegalStateException("Zaměstnanec s tímto rodným číslem již existuje");
        }

        Employee employee = new Employee();
        employee.setName(employeeCreate.getName());
        employee.setSurname(employeeCreate.getSurname());
        employee.setBirthNumber(employeeCreate.getBirthNumber());
        employee.setUnitForEmployee(employeeCreate.getEmployeeUnit());

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Optional<Employee> employeeExists = employeeRepository.findById(id);
        if (employeeExists.isEmpty())
        {
            throw new IllegalStateException("Vybraného zaměstnance se nepodařilo najít");
        }

        Employee employee = employeeExists.get();

        try {
            employeeRepository.delete(employee);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }

    }
}
