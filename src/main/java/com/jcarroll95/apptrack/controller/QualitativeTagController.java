package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.PipelineEvent;
import com.jcarroll95.apptrack.model.QualitativeTag;
import com.jcarroll95.apptrack.repository.QualitativeTagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qualitativetag")
public class QualitativeTagController {

    private final QualitativeTagRepository qualitativeTagRepository;

    public QualitativeTagController(QualitativeTagRepository qualitativeTagRepository) {
        this.qualitativeTagRepository = qualitativeTagRepository;
    }

    @GetMapping
    public List<QualitativeTag> getAll() {
        return qualitativeTagRepository.findAll();
    }

    @PostMapping
    public QualitativeTag create(@RequestBody QualitativeTag qualitativeTag) {
        return qualitativeTagRepository.save(qualitativeTag);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QualitativeTag> getById(@PathVariable Long id) {
        return qualitativeTagRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
