package org.example.backend.job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findJobsByManager_Id(int managerId);

    //TODO Fix the foreign key dependency issues in all tables
    void deleteAllByManager_Id(int managerId);
}
