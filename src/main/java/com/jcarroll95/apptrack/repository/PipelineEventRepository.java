package com.jcarroll95.apptrack.repository;

import com.jcarroll95.apptrack.model.PipelineEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelineEventRepository extends JpaRepository<PipelineEvent, Long> {
}