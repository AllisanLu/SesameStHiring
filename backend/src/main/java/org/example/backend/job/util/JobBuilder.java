package org.example.backend.job.util;

import org.example.backend.job.Job;
import org.example.backend.job.dto.JobDto;

public class JobBuilder {

    public static JobDto getJobDtoFromJob(Job job) {
        return new JobDto(
                job.getId(),
                job.getManager().getId(),
                job.getDepartment(),
                job.getListingTitle(),
                job.getDateListed(),
                job.getDateClosed(),
                job.getJobTitle(),
                job.getJobDescription(),
                job.getAdditionalInformation(),
                job.getListingStatus());
    }

    public static Job getJobFromJobDto(JobDto jobDto) {
        Job job = new Job();
        job.setDepartment(jobDto.getDepartment());
        job.setListingTitle(jobDto.getListingTitle());
        job.setDateListed(jobDto.getDateListed());
        job.setDateClosed(jobDto.getDateClosed());
        job.setJobTitle(jobDto.getJobTitle());
        job.setJobDescription(jobDto.getJobDescription());
        job.setAdditionalInformation(jobDto.getAdditionalInformation());
        job.setListingStatus(jobDto.getListingStatus());
        return job;
    }
}
