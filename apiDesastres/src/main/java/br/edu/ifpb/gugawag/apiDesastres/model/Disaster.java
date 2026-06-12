package br.edu.ifpb.gugawag.apiDesastres.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_disaster")
public class Disaster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String occurrenceDate;
    private Integer durationDays;
    private Integer intensityScale;
    private Integer victimCount;
    private String type;

    @ElementCollection 
    private List<String> regions;

    private String imageUrl;

    public Long getId() {
        return id;
    }

    public String getOccurrenceDate() {
        return occurrenceDate;
    }

    public void setOccurrenceDate(String occurrenceDate) {
        this.occurrenceDate = occurrenceDate;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public Integer getIntensityScale() {
        return intensityScale;
    }

    public void setIntensityScale(Integer intensityScale) {
        this.intensityScale = intensityScale;
    }

    public Integer getVictimCount() {
        return victimCount;
    }

    public void setVictimCount(Integer victimCount) {
        this.victimCount = victimCount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @ManyToOne
    @JoinColumn(name = "create_by_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"}) 
    private User createdBy;

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}