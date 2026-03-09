package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;

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