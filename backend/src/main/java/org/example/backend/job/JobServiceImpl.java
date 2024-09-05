package org.example.backend.job;

import jakarta.transaction.Transactional;
import org.example.backend.application.ApplicationRepository;
import org.example.backend.job.dto.JobDto;
import org.example.backend.manager.Manager;
import org.example.backend.manager.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final ManagerRepository managerRepository;

    @Autowired
    public JobServiceImpl(JobRepository jobRepository, ManagerRepository managerRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.managerRepository = managerRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public List<JobDto> getAllJobs() {
        List<JobDto> jobDtoList = new ArrayList<>();

        List<Job> jobs = jobRepository.findAll();
        for (Job job : jobs) {
            jobDtoList.add(new JobDto(
                    job.getId(),
                    job.getManager().getId(),
                    job.getDepartment(),
                    job.getListingTitle(),
                    job.getDateListed(),
                    job.getDateClosed(),
                    job.getJobTitle(),
                    job.getJobDescription(),
                    job.getAdditionalInformation(),
                    job.getListingStatus()
                    ));
        }
        return jobDtoList;
    }

    @Override
    public Job getJobById(int id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public List<JobDto> getJobsByManagerId(int managerId) {
        List<JobDto> jobDtoList = new ArrayList<>();

        List<Job> jobs = jobRepository.findJobsByManager_Id(managerId);
        for (Job job : jobs) {
            jobDtoList.add(new JobDto(
                    job.getId(),
                    job.getManager().getId(),
                    job.getDepartment(),
                    job.getListingTitle(),
                    job.getDateListed(),
                    job.getDateClosed(),
                    job.getJobTitle(),
                    job.getJobDescription(),
                    job.getAdditionalInformation(),
                    job.getListingStatus()
            ));
        }
        return jobDtoList;

    }

    @Override
    public Job createJob(Job job, int managerId) {
        Optional<Manager> managerOptional = managerRepository.findById(managerId);
        if (managerOptional.isPresent()) {
            job.setManager(managerOptional.get());
            return jobRepository.save(job);
        }

        return null;
    }

    @Override
    public Job updateJob(int id, Job job) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        if (jobOptional.isPresent()) {
            Job jobToUpdate = jobOptional.get();
            jobToUpdate.setDepartment(job.getDepartment());
            jobToUpdate.setListingTitle(job.getListingTitle());
            jobToUpdate.setDateListed(job.getDateListed());
            jobToUpdate.setDateClosed(job.getDateClosed());
            jobToUpdate.setJobTitle(job.getJobTitle());
            jobToUpdate.setJobDescription(job.getJobDescription());
            jobToUpdate.setAdditionalInformation(job.getAdditionalInformation());
            jobToUpdate.setListingStatus(job.getListingStatus());
            return jobRepository.save(jobToUpdate);
        }

        return null;
    }

    @Override
    @Transactional
    public boolean deleteJob(int id) {
        if (jobRepository.existsById(id)) {
            applicationRepository.deleteAllByJob_Id(id);
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
