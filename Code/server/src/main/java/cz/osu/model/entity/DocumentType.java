package cz.osu.model.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class DocumentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String name;

    @OneToOne
    @JoinColumn(name = "agenda_id", referencedColumnName = "id")
    private Agenda agenda;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
