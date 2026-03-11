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
        // arrange buildApp
        // arrange when - this is scripting the mock (when the code calls this method, return this)
        // act - call the method under test
        // assert - check the outcomes
        // verify - confirm that the code did something with its dependency

        Application newApp = buildApp(true, AppStage.SUBMITTED, LocalDate.now());
        newApp.setId(1L);

        when(applicationRepository.findById(1L)).thenReturn(Optional.of(newApp));

        // pass in body object
        Map<String, String> body = Map.of(
                "stage","RECRUITER_RESPONSE",
                "date", LocalDate.now().toString(),
                "notes", ""
        );

        // self note for the lambda: pass the same object back, ie pretend to be a database
        when(applicationRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        ResponseEntity<Application> response = controller.updateStage(1L, body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(AppStage.RECRUITER_RESPONSE, newApp.getCurrentStage());
        assertEquals(LocalDate.now(), newApp.getDateRecruiterResponse());
        assertTrue(newApp.isActive());
        verify(applicationRepository).save(any(Application.class));
    }

}
