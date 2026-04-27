package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.ResumeVariant;
import com.jcarroll95.apptrack.repository.ResumeVariantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<ResumeVariant> update(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        return resumeVariantRepository.findById(id).map(rv -> {
            if (body.containsKey("versionLabel") && body.get("versionLabel") != null)
                rv.setVersionLabel((String) body.get("versionLabel"));
            if (body.containsKey("dateCreated"))
                rv.setDateCreated(body.get("dateCreated") != null
                    ? LocalDate.parse((String) body.get("dateCreated")) : null);
            if (body.containsKey("changeSummary"))
                rv.setChangeSummary(body.get("changeSummary") != null
                    ? (String) body.get("changeSummary") : null);
            if (body.containsKey("fileUrl"))
                rv.setFileUrl(body.get("fileUrl") != null
                    ? (String) body.get("fileUrl") : null);
            if (body.containsKey("deleted"))
                rv.setDeleted((Boolean) body.get("deleted"));
            if (body.containsKey("contentText"))
                rv.setContentText(body.get("contentText") != null ? (String) body.get("contentText") : null);
            return ResponseEntity.ok(resumeVariantRepository.save(rv));
        }).orElse(ResponseEntity.notFound().build());
    }
}
