package cz.osu.model.entity;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 64)
    private String name;

    @Column(length = 64)
    private String surname;

    @Column(length = 13)
    private String birthNumber;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @OneToMany(mappedBy = "employeeForPosition", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Position> positions;

    @OneToMany(mappedBy = "employeeForDocument",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Document> documentsForEmployee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "unit_id")
    @JsonIgnoreProperties("employeeUnit")
    private Unit unitForEmployee;

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getBirthNumber() {
        return birthNumber;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public List<Document> getDocumentsForEmployee() {
        return documentsForEmployee;
    }

    public Unit getUnitForEmployee() { return unitForEmployee; }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setBirthNumber(String birthNumber) { this.birthNumber = birthNumber; }

    public void setUnitForEmployee(Unit unit) { this.unitForEmployee = unit; }
}
