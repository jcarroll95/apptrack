package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.JobListing;
import com.jcarroll95.apptrack.repository.JobListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/joblistings")
public class JobListingController {

    private final JobListingRepository jobListingRepository;

    public JobListingController(JobListingRepository jobListingRepository) {
        this.jobListingRepository = jobListingRepository;
    }

    @GetMapping
    public List<JobListing> getAll() {
        return jobListingRepository.findAll();
    }

    @PostMapping
    public JobListing create(@RequestBody JobListing joblisting) {
        return jobListingRepository.save(joblisting);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobListing> getById(@PathVariable Long id) {
        return jobListingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}