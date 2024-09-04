package org.example.backend.application;

import org.example.backend.application.dto.ApplicationDto;
import org.example.backend.application.util.ApplicationBuilder;
import org.example.backend.job.Job;
import org.example.backend.job.JobRepository;
import org.example.backend.user.User;
import org.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    @Autowired
    public ApplicationServiceImpl(ApplicationRepository applicationRepository, UserRepository userRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }


    @Override
    public List<ApplicationDto> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        List<ApplicationDto> applicationDtos = new ArrayList<>();
        for (Application application : applications) {
            applicationDtos.add(ApplicationBuilder.getApplicationDtoFromApplication(application));
        }
        return applicationDtos;
    }

    @Override
    public ApplicationDto getApplicationById(int id) {
        Application application = applicationRepository.findById(id).orElse(null);

        if (application == null) {
            return null;
        }
        return ApplicationBuilder.getApplicationDtoFromApplication(application);
    }

    @Override
    public List<ApplicationDto> getApplicationsByManagerId(int managerId) {
        List<Application> applications = applicationRepository.findApplicationsByJob_Manager_Id(managerId);
        List<ApplicationDto> applicationDtos = new ArrayList<>();
        for (Application application : applications) {
            applicationDtos.add(ApplicationBuilder.getApplicationDtoFromApplication(application));
        }
        return applicationDtos;
    }

    @Override
    public List<ApplicationDto> getApplicationsByJobId(int jobId) {
        List<Application> applications = applicationRepository.findApplicationsByJob_Id(jobId);
        List<ApplicationDto> applicationDtos = new ArrayList<>();
        for (Application application : applications) {
            applicationDtos.add(ApplicationBuilder.getApplicationDtoFromApplication(application));
        }
        return applicationDtos;
    }

    @Override
    public ApplicationDto createApplication(ApplicationDto applicationDto) {
        Optional<User> user = userRepository.findById(applicationDto.getUserId());
        Optional<Job> job = jobRepository.findById(applicationDto.getJobId());

        if (user.isPresent() && job.isPresent()) {
            Application application = ApplicationBuilder.getApplicationFromApplicationDto(applicationDto);
            application.setUser(user.get());
            application.setJob(job.get());
            return ApplicationBuilder.getApplicationDtoFromApplication(applicationRepository.save(application));
        }

        return null;
    }

    @Override
    public ApplicationDto updateApplication(int id, ApplicationDto applicationDto) {
        Optional<Application> applicationOptional = applicationRepository.findById(id);

        if (applicationOptional.isPresent()) {
            Application application = applicationOptional.get();
            application.setApplicationStatus(applicationDto.getApplicationStatus());
            return ApplicationBuilder.getApplicationDtoFromApplication(applicationRepository.save(application));
        }

        return null;
    }

    @Override
    public boolean deleteApplication(int id) {
        if (applicationRepository.existsById(id)) {
            applicationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
