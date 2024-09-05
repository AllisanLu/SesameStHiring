package org.example.backend.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findApplicationsByJob_Id(int id);

    List<Application> findApplicationsByJob_Manager_Id(int id);

    void deleteAllByJob_Id(int id);

}
