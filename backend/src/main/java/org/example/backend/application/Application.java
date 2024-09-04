package org.example.backend.application;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.job.Job;
import org.example.backend.user.User;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    private String dateApplied;
    private String coverLetter;
    private String resume;
    private String applicationStatus = "Pending";
}
