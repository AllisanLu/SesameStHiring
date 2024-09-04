package org.example.backend.job;

import org.example.backend.job.Util.JobBuilder;
import org.example.backend.job.dto.JobDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
        List<JobDto> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable int id) {
        Job job = jobService.getJobById(id);
        if (job != null) {
            return ResponseEntity.ok(JobBuilder.getJobDtoFromJob(job));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/manager/{id}")
    public ResponseEntity<List<JobDto>> getJobsByManagerId(@PathVariable int id) {
        List<JobDto> jobs = jobService.getJobsByManagerId(id);
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobDetails) {
        Job job = jobService.createJob(JobBuilder.getJobFromJobDto(jobDetails), jobDetails.getManagerId());
        return ResponseEntity.ok(JobBuilder.getJobDtoFromJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable int id, @RequestBody JobDto jobDetails) {
        Job updatedJob = jobService.updateJob(id, JobBuilder.getJobFromJobDto(jobDetails));
        if (updatedJob != null) {
            return ResponseEntity.ok(JobBuilder.getJobDtoFromJob(updatedJob));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable int id) {
        if (jobService.deleteJob(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
