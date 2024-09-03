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

}
