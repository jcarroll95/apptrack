package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.PipelineEvent;
import com.jcarroll95.apptrack.repository.PipelineEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pipelineevents")
public class PipelineEventController {

    private final PipelineEventRepository pipelineEventRepository;

    public PipelineEventController(PipelineEventRepository pipelineEventRepository) {
        this.pipelineEventRepository = pipelineEventRepository;
    }

    @GetMapping
    public List<PipelineEvent> getAll() {
        return pipelineEventRepository.findAll();
    }

    @PostMapping
    public PipelineEvent create(@RequestBody PipelineEvent pipelineEvent) {
        return pipelineEventRepository.save(pipelineEvent);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PipelineEvent> getById(@PathVariable Long id) {
        return pipelineEventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}