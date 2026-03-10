package com.jcarroll95.apptrack.controller;

import com.jcarroll95.apptrack.model.Application;
import com.jcarroll95.apptrack.repository.ApplicationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
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

            Application.AppStage newStage = Application.AppStage.valueOf(stage);
            app.setCurrentStage(newStage);

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
