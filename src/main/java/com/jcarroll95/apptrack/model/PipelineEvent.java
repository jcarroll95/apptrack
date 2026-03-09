package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pipelineevents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PipelineEvent {
    /**
     * **PipelineEvent**
     *
     * - id
     * - application (FK)
     * - event type (enum matching stage values plus WENT_COLD)
     * - occurrence index
     * - timestamp
     * - notes
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    private String eventType;

    private int occurrenceIndex;

    private LocalDateTime timestamp;

    private String notes;

}
