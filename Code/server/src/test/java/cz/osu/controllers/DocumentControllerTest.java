package cz.osu.controllers;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
// Only DocumentController context
class DocumentControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private DocumentController documentController;
    
    @Test
    void createDocument() throws Exception {
        String uri = "/document";

        MockMultipartFile jsonFile = new MockMultipartFile("document", "", MediaType.APPLICATION_JSON_VALUE,
                ("{\"document_type\": 10," +
                "\"path\": \"test/path\"," +
                "\"releaseDate\": \"2009-12-20T23:00:00.000+00:00\"," +
                "\"validityDate\": \"2011-03-13T23:00:00.000+00:00\"," +
                "\"employeeForDocument\": {" +
                "\"id\": 1" +
                "}}").getBytes());

        Resource fileResource = new ClassPathResource(
                "test-files/test-pdf.pdf");
        assertNotNull(fileResource);
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test-pdf.pdf",
                MediaType.MULTIPART_FORM_DATA_VALUE,
                fileResource.getInputStream());
        assertNotNull(file);

        MockMvc mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mvc.perform(MockMvcRequestBuilders.multipart(uri).file(jsonFile).file(file)).andExpect(status().is(200));
    }
}
