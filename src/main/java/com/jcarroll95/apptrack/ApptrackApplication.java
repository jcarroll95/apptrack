package com.jcarroll95.apptrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@SpringBootApplication
@EnableScheduling
public class ApptrackApplication {

    /**
     * If the schema already exists but flyway_schema_history is out of sync
     * (baseline at V0 but tables were created outside Flyway), drop the history
     * table so baseline-on-migrate re-fires at baseline-version=2 and skips
     * already-applied migrations.
     */
    @Bean
    public FlywayMigrationStrategy flywayMigrationStrategy() {
        return flyway -> {
            try (Connection conn = flyway.getConfiguration().getDataSource().getConnection()) {
                ResultSet tables = conn.getMetaData().getTables(null, "public", "applications", null);
                if (tables.next()) {
                    try (Statement stmt = conn.createStatement()) {
                        stmt.execute("DROP TABLE IF EXISTS flyway_schema_history");
                    }
                }
            } catch (Exception ignored) {}
            flyway.migrate();
        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "HEAD", "POST", "PATCH", "PUT", "DELETE", "OPTIONS");
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ApptrackApplication.class, args);
    }

}
