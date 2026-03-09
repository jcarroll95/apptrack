package com.jcarroll95.apptrack.repository;

import com.jcarroll95.apptrack.model.QualitativeTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualitativeTagRepository extends JpaRepository<QualitativeTag, Long> {
}