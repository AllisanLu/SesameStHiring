package org.example.backend.candidate;

import jakarta.persistence.Entity;
import lombok.*;
import org.example.backend.user.User;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate extends User {

    private String fullName;
    private String email;
    private String address;
    private String phone;
    private String resume;

    public Candidate(int id, String fullName, String email, String address, String phone, String resume) {
        super(id);
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.resume = resume;
    }

    public Candidate(int id) {
        super(id);
    }
}
