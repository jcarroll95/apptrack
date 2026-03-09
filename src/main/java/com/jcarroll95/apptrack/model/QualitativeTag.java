package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "qualitativetags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class QualitativeTag {
    /**
     * **QualitativeTag**
     *
     * - id
     * - application (FK)
     * - pipeline event (FK, nullable - links tag to specific touchpoint if known)
     * - tag text
     * - sentiment (enum: POSITIVE, NEUTRAL, NEGATIVE)
     * - date
     * - notes
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tagText;

    @Enumerated(EnumType.STRING)
    private Sentiment sentiment;

    public enum Sentiment {
        POSITIVE,
        NEUTRAL,
        NEGATIVE
    }

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;

    @ManyToOne
    @JoinColumn(name = "pipelineevent_id", nullable = true)
    private PipelineEvent pipelineEvent;

}
