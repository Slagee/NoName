package cz.osu.controllers;

import com.sun.istack.NotNull;

import cz.osu.model.entity.Document;
import cz.osu.model.service.DocumentService;
import cz.osu.model.service.EmployeeService;
import cz.osu.model.service.FileService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
public class DocumentController {
    final
    DocumentService documentService;
    final
    EmployeeService employeeService;
    private final FileService fileService;

    public DocumentController(DocumentService documentService, EmployeeService employeeService, FileService fileService) {
        this.documentService = documentService;
        this.employeeService = employeeService;
        this.fileService = fileService;
    }

    @Deprecated
    @GetMapping("/document/list")
    public List<Document> documentList() {
        return documentService.list();
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/document")
    public Document documentById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return documentService.getById(id);
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/document/page")
    @Parameters({
            @Parameter(name = "originalName"),
            @Parameter(name = "employeeId"),
            @Parameter(name = "typeId"),
    })
    public Page<Document> loadDocumentPage(
            @And({
                    @Spec(path = "originalName", params = "originalName",spec = LikeIgnoreCase.class),
                    @Spec(path = "employeeForDocument.id", params = "employeeId", spec = Equal.class),
                    @Spec(path = "type.id", params = "typeId", spec = Equal.class)
            }) Specification<Document> documentSpec,
            Pageable pageable){
        return documentService.loadPage(documentSpec, pageable);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping(path = "/document/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable("id") Long id)
    {
        Document document = documentService.getById(id);
        if (document == null) {
            return new ResponseEntity<>("Dokument se nepoda??ilo naj??t v datab??zi", HttpStatus.BAD_REQUEST);
        }

        try {
            documentService.deleteDocument(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @GetMapping(path = "/role-test")
    public ResponseEntity<?> getTestRole(){
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(MediaType.MULTIPART_FORM_DATA_VALUE))
                .body(authorities.toString());

    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @PostMapping(path = "/document", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addDocument(@RequestPart("document") Document document,
                                         @RequestPart("file") @NotNull MultipartFile file){

        if (file.isEmpty()){
            return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
        }
        if (!Objects.requireNonNull(file.getOriginalFilename()).endsWith(".pdf")){
            return new ResponseEntity<>("File is not PDF", HttpStatus.BAD_REQUEST);
        }
        String path = fileService.saveUploadedFile(file);
        if (path == null){
            return new ResponseEntity<>("File failed to save", HttpStatus.BAD_REQUEST);
        }
        document.setPath(path);
        document.setOriginalName(file.getOriginalFilename());
        document.setSize(file.getSize());
        document.setStoreDate(new Date());
        document.setEmployeeForDocument(document.getEmployeeForDocument());
        documentService.addDocument(document);

        return new ResponseEntity<>(document, HttpStatus.CREATED);
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/document/download")
    public ResponseEntity<?> downloadFile(@RequestParam("id") Long id){
        String pathString = documentService.getPathById(id);
        if (pathString == null)
            return new ResponseEntity<>("Nepoda??ilo se naj??t cestu k dokumentu", HttpStatus.BAD_REQUEST);
        Path path = Paths.get(pathString);
        try {
            Resource resource = new UrlResource(path.toUri());
            System.out.println(resource);
            if (resource.exists()){
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf(MediaType.APPLICATION_PDF_VALUE))
                        .body(resource);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Nepoda??ilo se st??hnout dokument",HttpStatus.BAD_REQUEST);
    }
}
