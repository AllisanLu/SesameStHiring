package org.example.backend.job;

import org.example.backend.job.dto.JobDto;

import java.util.List;

public interface JobService {

    List<JobDto> getAllJobs();

    Job getJobById(int id);

    List<JobDto> getJobsByManagerId(int managerId);

    Job createJob(Job job, int managerId);

    Job updateJob(int id, Job job);

    boolean deleteJob(int id);

}
