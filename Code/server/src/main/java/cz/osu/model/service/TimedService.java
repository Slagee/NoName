package cz.osu.model.service;

import cz.osu.model.entity.Document;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Component
public class TimedService {

    private final DocumentService documentService;

    public TimedService(DocumentService documentService) {
        this.documentService = documentService;
    }

    //@Scheduled(cron = "0 */5 * * * *")
    /*public void deleteTest() {
        System.out.println("Bezim kazdych 5 minut");
        List<Document> documents = documentService.list();

        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");

        Calendar cal = new GregorianCalendar();
        cal.add(Calendar.DAY_OF_MONTH, +7);
        Date week = cal.getTime();

        String weekForm = fmt.format(week);

        for (Document doc : documents) {
            if (fmt.format(doc.getReleaseDate()).equals(weekForm)) {
                documentService.notifyDoc(doc.getId());
                System.out.println("Dokument " +doc.getOriginalName()+ "bude smazan za tyden");
            } else if (doc.getReleaseDate().before(new Date())) {
                System.out.println("Mazu soubor: " +doc.getOriginalName());
                try {
                    documentService.deleteDocument(doc.getId());
                } catch (Exception ex) {
                    System.out.println("Nepovedlo se smazat dokument: " +ex);
                }
                System.out.println("Povedlo se smazat dokument");
            }
        }
    }*/

    //@Scheduled(cron = "0 0 0 * * ?")
    /*public void deleteDocuments() {
        System.out.println("Bezim kazdou pulnoc");
        List<Document> documents = documentService.list();
        Calendar cal = new GregorianCalendar();
        cal.add(Calendar.DAY_OF_MONTH, +7);
        Date week = cal.getTime();
        for (Document doc : documents) {
            if (doc.getReleaseDate().equals(week)) {
                System.out.println("Dokument " +doc.getOriginalName()+ " bude smazan za tyden");
            } else if (doc.getReleaseDate().before(new Date())) {
                try {
                    documentService.deleteDocument(doc.getId());
                } catch (Exception ex) {
                    throw new IllegalStateException(ex.getMessage());
                }
            }
        }
    }*/
}
