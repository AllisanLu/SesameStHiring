package org.example.backend.application;

import org.example.backend.application.dto.ApplicationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable int id) {
        ApplicationDto applicationDto = applicationService.getApplicationById(id);
        if (applicationDto != null) {
            return ResponseEntity.ok(applicationDto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/manager/{id}")
    public ResponseEntity<List<ApplicationDto>> getApplicationsByManager(@PathVariable int id) {
        return ResponseEntity.ok(applicationService.getApplicationsByManagerId(id));
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<List<ApplicationDto>> getApplicationsByJob(@PathVariable int id) {
        return ResponseEntity.ok(applicationService.getApplicationsByJobId(id));
    }

    @PostMapping
    public ResponseEntity<ApplicationDto> createApplication(@RequestBody ApplicationDto applicationDto) {
        ApplicationDto newApplication = applicationService.createApplication(applicationDto);
        if (newApplication != null) {
            return ResponseEntity.ok(newApplication);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable int id, @RequestBody ApplicationDto applicationDto) {
        ApplicationDto updatedApplication = applicationService.updateApplication(id, applicationDto);
        if (updatedApplication != null) {
            return ResponseEntity.ok(updatedApplication);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApplicationDto> deleteApplication(@PathVariable int id) {
        if (applicationService.deleteApplication(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
