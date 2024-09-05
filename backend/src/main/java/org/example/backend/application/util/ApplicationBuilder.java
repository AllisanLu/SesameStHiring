package org.example.backend.application.util;

import org.example.backend.application.Application;
import org.example.backend.application.dto.ApplicationDto;

public class ApplicationBuilder {

    public static Application getApplicationFromApplicationDto(ApplicationDto applicationDto) {
        Application application = new Application();

        application.setDateApplied(applicationDto.getDateApplied());
        application.setCoverLetter(applicationDto.getCoverLetter());
        application.setResume(applicationDto.getResume());

        return application;
    }

    public static ApplicationDto getApplicationDtoFromApplication(Application application) {
        return new ApplicationDto(
                application.getId(),
                application.getUser().getId(),
                application.getJob().getId(),
                application.getJob().getManager().getId(),
                application.getDateApplied(),
                application.getCoverLetter(),
                application.getResume(),
                application.getApplicationStatus()
        );
    }
}
