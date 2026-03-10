package com.jcarroll95.apptrack.service;

import com.jcarroll95.apptrack.model.Application;
import com.jcarroll95.apptrack.repository.ApplicationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InactivityScheduler {

    private static final int INACTIVITY_THRESHOLD_DAYS = 21;

    private final ApplicationRepository applicationRepository;

    public InactivityScheduler(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Scheduled(cron = "0 0 6 * * *")
    public void markInactiveApplications() {
        LocalDate cutoff = LocalDate.now().minusDays(INACTIVITY_THRESHOLD_DAYS);

        List<Application> candidates = applicationRepository.findAll().stream()
                .filter(a -> a.isActive())
                .filter(a -> !isTerminal(a.getCurrentStage()))
                .filter(a -> lastActivityDate(a).isBefore(cutoff))
                .toList();

        candidates.forEach(a -> {
            a.setCurrentStage(Application.AppStage.INACTIVE);
            a.setActive(false);
        });

        applicationRepository.saveAll(candidates);
    }

    private boolean isTerminal(Application.AppStage stage) {
        if (stage == null) return false;
        return stage == Application.AppStage.OFFER
                || stage == Application.AppStage.REJECTED
                || stage == Application.AppStage.INACTIVE;
    }

    private LocalDate lastActivityDate(Application a) {
        LocalDate last = a.getDateSubmitted();
        if (a.getDateRecruiterResponse() != null) last = a.getDateRecruiterResponse();
        if (a.getDateRecruiterCall() != null) last = a.getDateRecruiterCall();
        if (a.getDateTechnicalScreen() != null) last = a.getDateTechnicalScreen();
        if (a.getDateTechnicalPass() != null) last = a.getDateTechnicalPass();
        if (a.getDateFinalRound() != null) last = a.getDateFinalRound();
        return last;
    }
}