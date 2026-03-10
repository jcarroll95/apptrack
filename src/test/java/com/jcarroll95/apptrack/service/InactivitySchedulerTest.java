package com.jcarroll95.apptrack.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.mockito.ArgumentCaptor;

import com.jcarroll95.apptrack.model.Application;
import com.jcarroll95.apptrack.model.Application.AppStage;
import com.jcarroll95.apptrack.repository.ApplicationRepository;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InactivitySchedulerTest {
    @Mock
    private ApplicationRepository applicationRepository;

    private InactivityScheduler scheduler;

    @BeforeEach
    void setUp() {
        scheduler = new InactivityScheduler(applicationRepository);
    }


    private Application buildApp(boolean active, AppStage stage, LocalDate dateSubmitted) {
        Application app = new Application();
        app.setActive(active);
        app.setCurrentStage(stage);
        app.setDateSubmitted(dateSubmitted);
        return app;
    }

    @Test
    void staleApplication_isMarkedInactive() {

        Application staleApp = buildApp(
                true,                              // active
                AppStage.SUBMITTED,                // non-terminal stage
                LocalDate.now().minusDays(30)      // submitted 30 days ago
        );

        when(applicationRepository.findAll()).thenReturn(List.of(staleApp));

        scheduler.markInactiveApplications();

        assertFalse(staleApp.isActive(), "Application should be deactivated");
        assertEquals(AppStage.INACTIVE, staleApp.getCurrentStage(),
                "Stage should be set to INACTIVE");

        verify(applicationRepository, times(1)).saveAll(List.of(staleApp));
    }

    @Test
    void recentApplication_isNotMarkedInactive() {
        // 10 days old. Well within the 21-day threshold.
        Application recentApp = buildApp(
                true,
                AppStage.SUBMITTED,
                LocalDate.now().minusDays(10)
        );

        when(applicationRepository.findAll()).thenReturn(List.of(recentApp));

        scheduler.markInactiveApplications();

        // Should be untouched.
        assertTrue(recentApp.isActive(), "Recent app should remain active");
        assertEquals(AppStage.SUBMITTED, recentApp.getCurrentStage(),
                "Stage should remain SUBMITTED");

        // saveAll should still be called, but with an EMPTY list —
        // no applications matched the filter.
        verify(applicationRepository).saveAll(List.of());
    }

    @Test
    void terminalApplication_isNeverMarkedInactive() {
        // Old but already REJECTED. The scheduler should skip it.
        Application rejectedApp = buildApp(
                false,                             // already inactive
                AppStage.REJECTED,                 // terminal stage
                LocalDate.now().minusDays(60)
        );

        when(applicationRepository.findAll()).thenReturn(List.of(rejectedApp));

        scheduler.markInactiveApplications();

        assertEquals(AppStage.REJECTED, rejectedApp.getCurrentStage());
        verify(applicationRepository).saveAll(List.of());
    }

    @Test
    void recentStageTransition_preventsInactiveMarking() {
        Application app = buildApp(
                true,
                AppStage.RECRUITER_RESPONSE,
                LocalDate.now().minusDays(30)      // submitted long ago
        );

        app.setDateRecruiterResponse(LocalDate.now().minusDays(5));

        when(applicationRepository.findAll()).thenReturn(List.of(app));

        scheduler.markInactiveApplications();

        assertTrue(app.isActive(), "App with recent activity should stay active");
        assertEquals(AppStage.RECRUITER_RESPONSE, app.getCurrentStage());
        verify(applicationRepository).saveAll(List.of());
    }

    @Test
    void mixedApplications_onlyStaleActiveOnesMarkedInactive() {

        Application stale = buildApp(true, AppStage.SUBMITTED,
                LocalDate.now().minusDays(30));

        Application recent = buildApp(true, AppStage.SUBMITTED,
                LocalDate.now().minusDays(10));

        Application rejected = buildApp(false, AppStage.REJECTED,
                LocalDate.now().minusDays(60));

        Application progressing = buildApp(true, AppStage.TECHNICAL_SCREEN,
                LocalDate.now().minusDays(40));
        progressing.setDateRecruiterResponse(LocalDate.now().minusDays(20));
        progressing.setDateRecruiterCall(LocalDate.now().minusDays(14));
        progressing.setDateTechnicalScreen(LocalDate.now().minusDays(7));

        when(applicationRepository.findAll())
                .thenReturn(List.of(stale, recent, rejected, progressing));

        scheduler.markInactiveApplications();

        // Only 'stale' should be affected.
        assertFalse(stale.isActive());
        assertEquals(AppStage.INACTIVE, stale.getCurrentStage());

        // Everyone else stays as they were.
        assertTrue(recent.isActive());
        assertEquals(AppStage.SUBMITTED, recent.getCurrentStage());

        assertEquals(AppStage.REJECTED, rejected.getCurrentStage());

        assertTrue(progressing.isActive());
        assertEquals(AppStage.TECHNICAL_SCREEN, progressing.getCurrentStage());

        ArgumentCaptor<List<Application>> captor = ArgumentCaptor.forClass(List.class);
        verify(applicationRepository).saveAll(captor.capture());
        List<Application> saved = captor.getValue();
        assertEquals(1, saved.size(), "Only 1 app should be saved");
        assertSame(stale, saved.get(0), "The stale app should be the one saved");
    }
}