package cz.osu.model.entity;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class UnitCreateUpdateDto {
    @NotNull
    @NotEmpty
    private String number;

    @NotNull
    @NotEmpty
    private String name;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
