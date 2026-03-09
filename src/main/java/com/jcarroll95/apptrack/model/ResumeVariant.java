package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "resumevariants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ResumeVariant {
    /**
     * - id
     * - version label
     * - date created
     * - change summary
     * - file url or path (nullable)
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String versionLabel;

    private LocalDate dateCreated;

    private String changeSummary;

    private String fileUrl;

}
