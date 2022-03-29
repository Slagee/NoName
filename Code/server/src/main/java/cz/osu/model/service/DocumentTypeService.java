package cz.osu.model.service;

import cz.osu.model.entity.DocumentType;
import cz.osu.model.repository.DocumentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentTypeService {
    @Autowired
    DocumentTypeRepository documentTypeRepository;

    public Page<DocumentType> loadPage(Specification<DocumentType> documentTypeSpec, Pageable pageable) {
        return documentTypeRepository.findAll(documentTypeSpec, pageable);
    }

    public List<DocumentType> getDocumentTypes() {
        return documentTypeRepository.findAll();
    }

    public DocumentType getById(Long id) {
        return documentTypeRepository.findById(id).orElse(null);
    }
}
