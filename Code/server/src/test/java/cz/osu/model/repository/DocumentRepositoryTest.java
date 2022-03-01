package cz.osu.model.repository;

import cz.osu.model.entity.Document;
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
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Sql(scripts = {"file:src/main/resources/db_scripts/document_type.sql", "file:src/main/resources/db_scripts/employee.sql", "file:src/main/resources/db_scripts/document.sql"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DocumentRepositoryTest {
    @Autowired private DataSource dataSource;
    @Autowired private EntityManager entityManager;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private EmployeeRepository employeeRepository;
/*
    @Test
    public void injectedComponentsAreNotNull() {
        assertNotNull(entityManager);
        assertNotNull(documentRepository);
    }
    @Test
    public void injectedDatasourceIsNotNull(){
        assertNotNull(dataSource);
    }

    @Test
    public void findByIdFromPopulationScript(){
        long id = 101;
        String path = "/viverra/pede/ac/diam/cras/pellentesque.json7q+UbRVapcjrR5kFmH2k1EAMbCSeDszHV7SGEdsRljg=";
        Document document = documentRepository.getOne(id);
        assertNotNull(document);
        assertEquals(id, document.getId());
        assertNotNull(document.getPath());
        assertEquals(path, document.getPath());
    }

    @Test
    public void insertDocument() throws Exception {
        Document newDocument = new Document();
        newDocument.setPath("\\pdf\\2021\\03\\7\\aktuality_ls_20-21.pdf");

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date releaseDate = format.parse("2028-12-25");
        newDocument.setReleaseDate(releaseDate);

        long employeeId = 70;
        Employee employee = employeeRepository.getOne(employeeId);
        newDocument.setEmployeeForDocument(employee);

        Document insertedDocument = documentRepository.save(newDocument);

        assertNotNull(insertedDocument);
        assertNotNull(insertedDocument.getId());
        assertEquals(newDocument.getPath(), insertedDocument.getPath());
        assertEquals(newDocument.getReleaseDate(), insertedDocument.getReleaseDate());

    }*/

}
