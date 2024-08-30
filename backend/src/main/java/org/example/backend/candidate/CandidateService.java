package org.example.backend.candidate;

import java.util.List;

public interface CandidateService {

    List<Candidate> getAllCandidates();

    Candidate getCandidateById(int id);

    Candidate createCandidate(Candidate candidate);

    Candidate updateCandidate(int id, Candidate candidate);

    boolean deleteCandidate(int id);
}
