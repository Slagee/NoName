package cz.osu.model.entity;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class DocumentUpdateDto {
    @NotNull
    @NotEmpty
    private Date releaseDate;

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
