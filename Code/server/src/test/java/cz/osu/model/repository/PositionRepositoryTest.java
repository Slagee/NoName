package cz.osu.model.repository;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.Position;
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
@Sql(scripts = {"file:src/main/resources/db_scripts/employee.sql", "file:src/main/resources/db_scripts/position.sql"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PositionRepositoryTest {
    @Autowired
    private DataSource dataSource;
    @Autowired private EntityManager entityManager;
    @Autowired private PositionRepository positionRepository;
    @Autowired private EmployeeRepository employeeRepository;

    @Test
    public void injectedComponentsAreNotNull() {
        assertNotNull(entityManager);
        assertNotNull(positionRepository);
    }
    @Test
    public void injectedDatasourceIsNotNull(){
        assertNotNull(dataSource);
    }
/*
    @Test
    public void findByIdFromPopulationScript(){
        long id = 10;
        String title = "Sociální pracovník";
        Position position = positionRepository.getOne(id);
        assertNotNull(position);
        assertEquals(id, position.getId());
        assertNotNull(position.getTitle());
        assertEquals(title, position.getTitle());
    }

    @Test
    public void insertPosition(){
        Position newPosition = new Position();
        newPosition.setTitle("IT pracovník");

        long employeeId = 70;
        Employee employee = employeeRepository.getOne(employeeId);
        newPosition.setEmployeeForPosition(employee);

        Position insertedPosition = positionRepository.save(newPosition);

        assertNotNull(insertedPosition);
        assertNotNull(insertedPosition.getId());
        assertEquals(newPosition.getTitle(), insertedPosition.getTitle());
    }

 */
}
