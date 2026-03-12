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

    // once we collect enough applications this dataset becomes a transition matrix
    // conceptually this becomes a markov chain with states and probabilities
    // at each stage we'll compute P(next_stage | current_stage, features)
    // we can also model latency with median time_to_event
            // this will also help us FOLLOW UP
    // probabilities are just ratios, we must also know COUNTS
    // 25% chance off a count of 5 vs count of 50 reveals CONFIDENCE of the estimate
    // never show Probability = x%, show Probability = x% (x/n trials)
    /**
     * Once we have ~30–50 applications logged we can compute:
     *
     * P(recruiter_response)
     * P(technical_screen | recruiter_response)
     * P(offer | final_round)
     *
     * Then overall success probability becomes:
     *
     * P(offer) =
     * P(rr | submitted)
     * *
     * P(screen | rr)
     * *
     * P(pass | screen)
     * *
     * P(offer | final)
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


    // Storing stages as strings so we don't need to update the enum in several places
    // tradeoff: type safety at compile
    private String fromStage;

    private String toStage;

}
