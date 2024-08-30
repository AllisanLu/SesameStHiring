package org.example.backend.candidate;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.user.User;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Candidate extends User {

    private String fullName;
    private String email;
    private String address;
    private String phone;
    private String resume;
}
