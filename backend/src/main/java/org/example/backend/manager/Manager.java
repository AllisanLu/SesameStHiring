package org.example.backend.manager;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.user.User;


@Entity
@Getter
@Setter
public class Manager extends User {

}
