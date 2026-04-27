package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.JobListing;
import com.jcarroll95.apptrack.repository.CompanyRepository;
import com.jcarroll95.apptrack.repository.JobListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/joblistings")
public class JobListingController {

    private final JobListingRepository jobListingRepository;
    private final CompanyRepository companyRepository;

    public JobListingController(JobListingRepository jobListingRepository,
                                CompanyRepository companyRepository) {
        this.jobListingRepository = jobListingRepository;
        this.companyRepository = companyRepository;
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

    @CrossOrigin(origins = "*")
    @PostMapping("/snapshot")
    public ResponseEntity<Object> snapshot(@RequestBody Map<String, String> body) {
        String url  = body.get("url");
        String text = body.get("text");
        if (url == null || text == null) return ResponseEntity.badRequest().build();

        Optional<JobListing> found = jobListingRepository.findByUrl(url);
        if (found.isPresent()) {
            JobListing jl = found.get();
            jl.setSnapshotText(text);
            jl.setSnapshotDate(LocalDateTime.now());
            return ResponseEntity.ok(jobListingRepository.save(jl));
        }
        return ResponseEntity.status(404).body(Map.of("receivedText", text));
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<JobListing> update(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        return jobListingRepository.findById(id).map(jl -> {
            if (body.containsKey("title") && body.get("title") != null)
                jl.setTitle((String) body.get("title"));
            if (body.containsKey("url"))
                jl.setUrl(body.get("url") != null ? (String) body.get("url") : null);
            if (body.containsKey("roleType") && body.get("roleType") != null)
                jl.setRoleType(JobListing.JobRole.valueOf((String) body.get("roleType")));
            if (body.containsKey("companyId") && body.get("companyId") != null) {
                Long cId = ((Number) body.get("companyId")).longValue();
                companyRepository.findById(cId).ifPresent(jl::setCompany);
            }
            if (body.containsKey("snapshotText"))
                jl.setSnapshotText(body.get("snapshotText") != null ? (String) body.get("snapshotText") : null);
            return ResponseEntity.ok(jobListingRepository.save(jl));
        }).orElse(ResponseEntity.notFound().build());
    }
}