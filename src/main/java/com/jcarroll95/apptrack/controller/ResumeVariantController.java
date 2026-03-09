package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.ResumeVariant;
import com.jcarroll95.apptrack.repository.ResumeVariantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumevariants")
public class ResumeVariantController {

    private final ResumeVariantRepository resumeVariantRepository;

    public ResumeVariantController(ResumeVariantRepository resumeVariantRepository) {
        this.resumeVariantRepository = resumeVariantRepository;
    }

    @GetMapping
    public List<ResumeVariant> getAll() {
        return resumeVariantRepository.findAll();
    }

    @PostMapping
    public ResumeVariant create(@RequestBody ResumeVariant resumeVariant) {
        return resumeVariantRepository.save(resumeVariant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeVariant> getById(@PathVariable Long id) {
        return resumeVariantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
