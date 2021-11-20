package cz.osu.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 64)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employeeForPosition;

    public Position() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Employee getEmployeeForPosition() {
        return employeeForPosition;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setEmployeeForPosition(Employee employee) {
        this.employeeForPosition = employee;
    }
}
