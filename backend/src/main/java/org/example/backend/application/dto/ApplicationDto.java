package org.example.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDto {

    private int id;
    private int userId;
    private int jobId;
    private int managerId;
    private String dateApplied;
    private String coverLetter;
    private String resume;
    private String applicationStatus;
}
