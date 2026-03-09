package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "joblistings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class JobListing {
    /**
     *
     **JobListing**

     - id
     - company (FK)
     - title
     - url
     - role type (enum: BACKEND, FULLSTACK, PLATFORM, DEVOPS, OTHER)
     - experience level (enum: JUNIOR, MID, SENIOR)
     - domain notes
     - date discovered
     - date expired (nullable)
     - description notes
     */


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private String title;
    private String url;

    @Enumerated(EnumType.STRING)
    private JobRole roleType;

    public enum JobRole {
        BACKEND,
        FULLSTACK,
        PLATFORM,
        DEVOPS,
        OTHER
    }

    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;

    public enum ExperienceLevel {
        JUNIOR,
        MID,
        SENIOR
    }

    private String domainNotes;
    private LocalDate dateDiscovered;

    @Column(nullable = true)
    private LocalDate dateExpired;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String descriptionNotes;
}
