package cz.osu.model.repository;

import cz.osu.model.entity.Employee;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(SpringExtension.class)
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Sql(scripts = {"file:src/main/resources/db_scripts/employee.sql"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EmployeeRepositoryTest {
    @Autowired private DataSource dataSource;
    @Autowired private EntityManager entityManager;
    @Autowired private EmployeeRepository employeeRepository;

    @Test
    public void injectedComponentsAreNotNull() {
        assertNotNull(entityManager);
        assertNotNull(employeeRepository);
    }
    @Test
    public void injectedDatasourceIsNotNull(){
        assertNotNull(dataSource);
    }

    @Test
    public void findByIdFromPopulationScript(){
        long id = 8;
        String birthNumber = "85-3563810";
        Employee employee = employeeRepository.getOne(id);
        assertNotNull(employee);
        assertEquals(id, employee.getId());
        assertNotNull(employee.getBirthNumber());
        assertEquals(birthNumber, employee.getBirthNumber());
    }

    @Test
    public void insertEmployee(){
        Employee newEmployee = new Employee();
        newEmployee.setName("Jan");
        newEmployee.setSurname("Pawlas");

        Employee insertedEmployee = employeeRepository.save(newEmployee);

        assertNotNull(insertedEmployee);
        assertNotNull(insertedEmployee.getId());
        assertEquals(newEmployee.getName(), insertedEmployee.getName());
    }

}