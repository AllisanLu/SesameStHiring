package org.example.backend.application;

import org.example.backend.application.dto.ApplicationDto;

import java.util.List;

public interface ApplicationService {

    List<ApplicationDto> getAllApplications();

    ApplicationDto getApplicationById(int id);

    List<ApplicationDto> getApplicationsByManagerId(int managerId);

    List<ApplicationDto> getApplicationsByJobId(int jobId);

    ApplicationDto createApplication(ApplicationDto applicationDto);

    ApplicationDto updateApplication(int id, ApplicationDto applicationDto);

    boolean deleteApplication(int id);


}
