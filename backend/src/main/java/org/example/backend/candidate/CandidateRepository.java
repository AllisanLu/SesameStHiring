package org.example.backend.candidate;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {


    @Modifying
    @Transactional
    @Query(value = "INSERT INTO candidate (id, full_name, email, address, phone, resume) VALUES (:id, :fullName, :email, :address, :phone, :resume)", nativeQuery = true)
    void insertCandidate(@Param("id") int id,
                         @Param("fullName") String fullName,
                         @Param("email") String email,
                         @Param("address") String address,
                         @Param("phone") String phone,
                         @Param("resume") String resume);
}
