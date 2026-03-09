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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    private String url;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperienceLevel experienceRequired;

    private String domainNotes;

    private LocalDate dateDiscovered;

    private LocalDate dateExpired;

    private String descriptionNotes;

    public enum ExperienceLevel {
        JUNIOR,
        MID,
        SENIOR
    }

    public enum RoleType {
        BACKEND,
        FULLSTACK,
        PLATFORM,
        DEVOPS,
        OTHER
    }
    /*
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


}