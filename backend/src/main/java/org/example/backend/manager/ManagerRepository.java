package org.example.backend.manager;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ManagerRepository extends JpaRepository<Manager, Integer> {


    @Modifying
    @Transactional
    @Query(value = "INSERT INTO manager (id, full_name, email, department, phone) VALUES (:id, :fullName, :email, :department, :phone)", nativeQuery = true)
    void insertManager(@Param("id") int id,
                       @Param("fullName") String fullName,
                       @Param("email") String email,
                       @Param("department") String department,
                       @Param("phone") String phone);
}
