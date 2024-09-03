package org.example.backend.manager;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ManagerRepository extends JpaRepository<Manager, Integer> {


    @Modifying
    @Transactional
    @Query(value = "INSERT INTO manager (id) VALUES (:id)", nativeQuery = true)
    void insertManager(@Param("id") int id);
}
