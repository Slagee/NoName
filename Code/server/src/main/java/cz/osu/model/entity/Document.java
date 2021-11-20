package cz.osu.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "document_type_id", referencedColumnName = "id")
    private DocumentType type;

    @Column
    private String originalName;

    @Column
    private Date storeDate;

    @Column
    private double size;

    @Column
    private Date releaseDate;

    @Column
    private Date validityDate;

    @Column(length = 255)
    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employeeForDocument;

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public void setStoreDate(Date storeDate) {
        this.storeDate = storeDate;
    }

    public void setSize(double size) {
        this.size = size;
    }

    public String getOriginalName() {
        return originalName;
    }

    public Date getStoreDate() {
        return storeDate;
    }

    public double getSize() {
        return size;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Document() {
    }

    public void setType(DocumentType type) {
        this.type = type;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setValidityDate(Date validityDate) {
        this.validityDate = validityDate;
    }

    public void setEmployeeForDocument(Employee employeeForDocument) {
        this.employeeForDocument = employeeForDocument;
    }

    public DocumentType getType() {
        return type;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public Date getValidityDate() {
        return validityDate;
    }

    public String getPath() {
        return path;
    }

    public Employee getEmployeeForDocument() {
        return employeeForDocument;
    }

    public Long getId() {
        return id;
    }
}


