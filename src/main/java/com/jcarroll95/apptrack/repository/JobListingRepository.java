package com.jcarroll95.apptrack.repository;

import com.jcarroll95.apptrack.model.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Long> {
    Optional<JobListing> findByUrl(String url);
}