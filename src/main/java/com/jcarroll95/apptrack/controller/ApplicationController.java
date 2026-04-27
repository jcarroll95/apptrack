package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.Application;
import com.jcarroll95.apptrack.model.Contact;
import com.jcarroll95.apptrack.model.PipelineEvent;
import com.jcarroll95.apptrack.model.ResumeVariant;
import com.jcarroll95.apptrack.repository.ApplicationRepository;
import com.jcarroll95.apptrack.repository.ContactRepository;
import com.jcarroll95.apptrack.repository.PipelineEventRepository;
import com.jcarroll95.apptrack.repository.ResumeVariantRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final PipelineEventRepository pipelineEventRepository;
    private final ResumeVariantRepository resumeVariantRepository;
    private final ContactRepository contactRepository;

    public ApplicationController(ApplicationRepository applicationRepository,
                                 PipelineEventRepository pipelineEventRepository,
                                 ResumeVariantRepository resumeVariantRepository,
                                 ContactRepository contactRepository) {
        this.applicationRepository = applicationRepository;
        this.pipelineEventRepository = pipelineEventRepository;
        this.resumeVariantRepository = resumeVariantRepository;
        this.contactRepository = contactRepository;
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

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Application> update(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        return applicationRepository.findById(id).map(app -> {
            if (body.containsKey("notes"))
                app.setNotes((String) body.get("notes"));
            if (body.containsKey("alignmentNotes"))
                app.setAlignmentNotes((String) body.get("alignmentNotes"));
            if (body.containsKey("referred"))
                app.setReferred((Boolean) body.get("referred"));
            if (body.containsKey("sourceChannel") && body.get("sourceChannel") != null)
                app.setSourceChannel(Application.SourceType.valueOf((String) body.get("sourceChannel")));
            if (body.containsKey("dateSubmitted") && body.get("dateSubmitted") != null)
                app.setDateSubmitted(LocalDate.parse((String) body.get("dateSubmitted")));
            if (body.containsKey("resumeVariantId") && body.get("resumeVariantId") != null) {
                Long rvId = ((Number) body.get("resumeVariantId")).longValue();
                resumeVariantRepository.findById(rvId).ifPresent(app::setResumeVariant);
            }
            if (body.containsKey("contactId")) {
                Object cId = body.get("contactId");
                if (cId == null) app.setContact(null);
                else contactRepository.findById(((Number) cId).longValue()).ifPresent(app::setContact);
            }
            return ResponseEntity.ok(applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    @PatchMapping("/{id}/stage")
    public ResponseEntity<Application> updateStage(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return applicationRepository.findById(id).map(app -> {
            String stage = body.get("stage");
            String date = body.get("date");
            String notes = body.get("notes");

            LocalDate transitionDate = date != null && !date.isEmpty()
                    ? LocalDate.parse(date)
                    : LocalDate.now();

            Application.AppStage fromStage = app.getCurrentStage();
            Application.AppStage newStage = Application.AppStage.valueOf(stage);
            app.setCurrentStage(newStage);

            PipelineEvent event = new PipelineEvent();
            event.setApplication(app);
            event.setFromStage(fromStage.toString());
            event.setToStage(newStage.toString());
            event.setOccurrenceIndex(0); // Add default value
            LocalDateTime pipelineTime = transitionDate.atTime(LocalTime.now());
            event.setTimestamp(pipelineTime);
            pipelineEventRepository.save(event);

            switch (newStage) {
                case RECRUITER_RESPONSE -> app.setDateRecruiterResponse(transitionDate);
                case RECRUITER_CALL     -> app.setDateRecruiterCall(transitionDate);
                case TECHNICAL_SCREEN   -> app.setDateTechnicalScreen(transitionDate);
                case TECHNICAL_PASS     -> app.setDateTechnicalPass(transitionDate);
                case FINAL_ROUND        -> app.setDateFinalRound(transitionDate);
                case OFFER              -> app.setDateOffer(transitionDate);
                case REJECTED           -> app.setDateRejection(transitionDate);
                case INACTIVE           -> app.setActive(false);
            }

            if (notes != null && !notes.isEmpty()) {
                app.setNotes(notes);
            }

            if (newStage == Application.AppStage.REJECTED
                    || newStage == Application.AppStage.INACTIVE
                    || newStage == Application.AppStage.OFFER) {
                app.setActive(false);
            }

            return ResponseEntity.ok(applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }

}
