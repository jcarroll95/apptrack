package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Application {
    /**
     * **Application**
     *
     * - id
     * - job listing (FK)
     * - resume variant (FK)
     * - contact (FK, nullable - the referral source if one exists)
     * - referred (boolean)
     * - source channel (enum: COLD, REFERRAL, RECRUITER_OUTREACH, JOB_BOARD)
     * - current stage (enum: SUBMITTED, RECRUITER_RESPONSE, RECRUITER_CALL, TECHNICAL_SCREEN, TECHNICAL_PASS, FINAL_ROUND, OFFER, REJECTED, INACTIVE)
     * - alignment notes
     * - date submitted
     * - date recruiter response
     * - date recruiter call
     * - date technical screen
     * - date technical pass
     * - date final round
     * - date offer
     * - rejection stage (nullable enum, same values as current stage)
     * - active (boolean)
     * - notes
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_listing_id", nullable = false)
    private JobListing jobListing;

    @ManyToOne
    @JoinColumn(name = "resume_variant_id", nullable = false)
    private ResumeVariant resumeVariant;

    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = true)
    private Contact contact;

    private boolean referred;

    @Enumerated(EnumType.STRING)
    private SourceType sourceChannel;

    public enum SourceType {
        COLD,
        REFERRAL,
        RECRUITER_OUTREACH,
        JOB_BOARD
    }

    @Enumerated(EnumType.STRING)
    private AppStage currentStage;

    public enum AppStage {
        SUBMITTED,
        RECRUITER_RESPONSE,
        RECRUITER_CALL,
        TECHNICAL_SCREEN,
        TECHNICAL_PASS,
        FINAL_ROUND,
        OFFER,
        REJECTED,
        INACTIVE
    }

    private LocalDate dateSubmitted;

    @Column(nullable = true)
    private LocalDate dateRecruiterResponse;

    @Column(nullable = true)
    private LocalDate dateRecruiterCall;

    @Column(nullable = true)
    private LocalDate dateTechnicalScreen;

    @Column(nullable = true)
    private LocalDate dateTechnicalPass;

    @Column(nullable = true)
    private LocalDate dateFinalRound;

    @Column(nullable = true)
    private LocalDate dateOffer;

    @Column(nullable = true)
    private LocalDate dateRejection;

    @Column(nullable = true)
    private String rejectionStage;

    private String notes;

    private boolean active;

    private String alignmentNotes;
}
