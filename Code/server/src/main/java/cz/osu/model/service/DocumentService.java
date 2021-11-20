package cz.osu.model.service;

import cz.osu.model.entity.Document;
import cz.osu.model.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<Document> list(){
        return documentRepository.findAll();
    }

    public Document getById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    public Document addDocument(Document document){
        return documentRepository.save(document);
    }

    public String getPathById(Long id){
        Document document = documentRepository.findById(id).orElse(null);
        if (document != null) {
            return document.getPath();
        }
        return null;
    }

    public Page<Document> loadPage(Specification<Document> documentSpec, Pageable pageable) {
        return documentRepository.findAll(documentSpec, pageable);
    }
}
