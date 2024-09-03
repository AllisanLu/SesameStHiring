package org.example.backend.candidate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.example.backend.user.User;
import org.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateServiceImpl implements CandidateService{

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository, UserRepository userRepository) {
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public Candidate getCandidateById(int id) {
        return candidateRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Candidate createCandidate(Candidate candidate) {
        Optional<User> userOptional = userRepository.findById(candidate.getId());

        if (userOptional.isPresent()) {

            candidateRepository.insertCandidate(
                    candidate.getId(),
                    candidate.getFullName(),
                    candidate.getEmail(),
                    candidate.getAddress(),
                    candidate.getPhone(),
                    candidate.getResume()
            );

            entityManager.flush();
            entityManager.clear();

            return candidateRepository.findById(candidate.getId()).orElse(null);
        }

        throw new IllegalArgumentException("User with ID " + candidate.getId() + " does not exist.");
    }

    @Override
    public Candidate updateCandidate(int id, Candidate candidate) {
        Optional<Candidate> candidateOptional = candidateRepository.findById(id);
        if (candidateOptional.isPresent()) {
            Candidate candidateToUpdate = candidateOptional.get();
            candidateToUpdate.setFullName(candidate.getFullName());
            candidateToUpdate.setEmail(candidate.getEmail());
            candidateToUpdate.setPhone(candidate.getPhone());
            candidateToUpdate.setAddress(candidate.getAddress());
            candidateToUpdate.setResume(candidate.getResume());
            return candidateRepository.save(candidateToUpdate);
        }
        return null;
    }

    @Override
    public boolean deleteCandidate(int id) {
        if (candidateRepository.existsById(id)) {
            candidateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
