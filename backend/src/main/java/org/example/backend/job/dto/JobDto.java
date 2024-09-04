package org.example.backend.job.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.job.Job;


@Getter
@Setter
@AllArgsConstructor
public class JobDto {

    private int id;
    private int managerId;
    private String department;
    private String listingTitle;
    private String dateListed;
    private String dateClosed;
    private String jobTitle;
    private String jobDescription;
    private String additionalInformation;
    private String listingStatus;

}
