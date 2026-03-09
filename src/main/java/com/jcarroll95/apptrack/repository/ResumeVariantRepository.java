package com.jcarroll95.apptrack.repository;

import com.jcarroll95.apptrack.model.ResumeVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeVariantRepository extends JpaRepository<ResumeVariant, Long> {
}