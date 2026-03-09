package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.Application;
import com.jcarroll95.apptrack.repository.ApplicationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping
    public List<Application> getAll() {
        return applicationRepository.findAll();
    }

    @PostMapping
    public Application create(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return applicationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summary")
    public Map<String, Long> getStageSummary() {
        return applicationRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        a -> a.getCurrentStage() != null ? a.getCurrentStage().toString() : "UNKNOWN",
                        Collectors.counting()
                ));
    }
}
