package cz.osu.model.service;

import cz.osu.model.entity.Employee;
import cz.osu.model.repository.EmployeeRepository;
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

    public List<Employee> list(){
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Page<Employee> loadPage(Specification<Employee> employeeSpec, Pageable pageable){
        return employeeRepository.findAll(employeeSpec, pageable);
    }
}
