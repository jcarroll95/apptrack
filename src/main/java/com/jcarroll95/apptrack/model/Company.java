package com.jcarroll95.apptrack.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Segment segment;

    @Enumerated(EnumType.STRING)
    private Size size;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public enum Segment {
        DEFENSE,
        EDUCATION,
        ENTERPRISE,
        CONSULTING,
        FINANCE,
        HEALTHCARE,
        FINTECH,
        TECH,
        STARTUP,
        OTHER
    }

    public enum Size {
        SMALL,
        MEDIUM,
        LARGE
    }


}