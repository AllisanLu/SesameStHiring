package org.example.backend.candidate;

public class CandidateFactory {

    public static Candidate createCandidate(Candidate candidate) {
        return new Candidate(
                candidate.getId(),
                candidate.getFullName(),
                candidate.getEmail(),
                candidate.getAddress(),
                candidate.getPhone(),
                candidate.getResume()
        );
    }
}
