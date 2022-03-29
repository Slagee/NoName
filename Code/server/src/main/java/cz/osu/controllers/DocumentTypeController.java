package cz.osu.controllers;

import cz.osu.model.entity.DocumentType;
import cz.osu.model.service.DocumentTypeService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
public class DocumentTypeController {
    final
    DocumentTypeService documentTypeService;

    public DocumentTypeController(DocumentTypeService documentTypeService) {
        this.documentTypeService = documentTypeService;
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/document/type/page")
    @Parameters({
            @Parameter(name = "name"),
    })
    public Page<DocumentType> loadDocumentTypePage(
            @Or({
                    @Spec(path = "name", params = "name",spec = LikeIgnoreCase.class),
                    @Spec(path = "id" , params = "id", spec = Equal.class)
            })Specification<DocumentType> documentTypeSpec,
                Pageable pageable){
            return documentTypeService.loadPage(documentTypeSpec, pageable);
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR", "ROLE_ADMIN", "ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/document/type")
    public DocumentType documentTypeById(@NotNull @RequestParam(value = "id") Long id){
        return documentTypeService.getById(id);
    }

    @Secured({"ROLE_ACCOUNTATN", "ROLE_HR", "ROLE_ADMIN"})
    @GetMapping("documentType/list")
    public List<DocumentType> getDocumentTypeList() {
        return documentTypeService.getDocumentTypes();
    }
}
