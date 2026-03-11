package com.jcarroll95.apptrack.controller;

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
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
class ApplicationControllerTest {
    @Mock
    private ApplicationRepository applicationRepository;

    private ApplicationController controller;

    @BeforeEach
    void setUp() {
        controller = new ApplicationController(applicationRepository);
    }

    private Application buildApp(boolean active, AppStage stage, LocalDate dateSubmitted) {
        Application app = new Application();
        app.setActive(active);
        app.setCurrentStage(stage);
        app.setDateSubmitted(dateSubmitted);
        return app;
    }

    @Test
    void application_stateForward() {
        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","RECRUITER_RESPONSE",
                "date", LocalDate.now().toString(),
                "notes", ""
        );

        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.RECRUITER_RESPONSE, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateRecruiterResponse());
        assertTrue(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

    @Test
    void application_rejected() {
        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","REJECTED",
                "date", LocalDate.now().toString(),
                "notes", ""
        );

        // self note for the lambda: pass the same object back, ie pretend to be a database
        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.REJECTED, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateRejection());
        assertFalse(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

    @Test
    void application_offer() {
        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","OFFER",
                "date", LocalDate.now().toString(),
                "notes", ""
        );

        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.OFFER, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateOffer());
        assertFalse(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

    @Test
    void application_notesOverwrite() {

        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","SUBMITTED",
                "date", LocalDate.now().toString(),
                "notes", "This note will overwrite the old data."
        );

        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.SUBMITTED, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateSubmitted());
        assertEquals("This note will overwrite the old data.", newApp.getNotes());
        assertTrue(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

    @Test
    void application_dontOverwrite() {

        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);
        newApp.setNotes("This should not be overwritten.");

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","SUBMITTED",
                "date", "",
                "notes", ""
        );

        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.SUBMITTED, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateSubmitted());
        assertEquals("This should not be overwritten.", newApp.getNotes());
        assertTrue(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

}
