package cz.osu.model.service;

import cz.osu.model.entity.Document;
import cz.osu.model.entity.Employee;
import cz.osu.model.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
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
        /*Calendar cal = new GregorianCalendar();
        cal.add(Calendar.YEAR, +5);
        Date years = cal.getTime();

        document.setReleaseDate(years);*/
        Calendar cal = new GregorianCalendar();
        cal.add(Calendar.DAY_OF_MONTH, +7);
        Date week = cal.getTime();

        document.setNotify(false);
        document.setReleaseDate(week);
        return documentRepository.save(document);
    }

    public void deleteDocument(Long id) {
        Document document = getById(id);
        documentRepository.delete(document);
    }

    public String getPathById(Long id){
        Document document = documentRepository.findById(id).orElse(null);
        if (document != null) {
            return document.getPath();
        }
        return null;
    }

    public List<Document> getNotifDocs() {
        return documentRepository.getDocumentsByNotifyIsTrue();
    }

    public void removeNotifyDoc(long id) {
        Document doc = getById(id);
        doc.setNotify(false);
        documentRepository.save(doc);
    }

    public void notifyDoc(long id) {
        Document doc = getById(id);
        doc.setNotify(true);
        documentRepository.save(doc);
    }

    public long getEmployeeIdForDocument(long id) {
        Document document = getById(id);
        Employee employee = document.getEmployeeForDocument();
        return employee.getId();
    }

    public Page<Document> loadPage(Specification<Document> documentSpec, Pageable pageable) {
        return documentRepository.findAll(documentSpec, pageable);
    }
}
