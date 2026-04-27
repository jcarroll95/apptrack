package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.JobListing;
import com.jcarroll95.apptrack.repository.CompanyRepository;
import com.jcarroll95.apptrack.repository.JobListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
            return ResponseEntity.ok(jobListingRepository.save(jl));
        }).orElse(ResponseEntity.notFound().build());
    }
}