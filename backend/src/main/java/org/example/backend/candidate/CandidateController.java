package org.example.backend.candidate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    /**
     * NEEDS to have id passed in as candidate
     *
     * @param candidate
     * @return
     */
    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        Candidate createdCandidate = candidateService.createCandidate(candidate);
        return ResponseEntity.ok(createdCandidate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable int id) {
        Candidate candidate = candidateService.getCandidateById(id);
        if (candidate != null) {
            return ResponseEntity.ok(candidate);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable int id, @RequestBody Candidate candidate) {
        Candidate updatedCandidate = candidateService.updateCandidate(id, candidate);
        if (updatedCandidate != null) {
            return ResponseEntity.ok(updatedCandidate);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Candidate> deleteCandidate(@PathVariable int id) {
        if (candidateService.deleteCandidate(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
