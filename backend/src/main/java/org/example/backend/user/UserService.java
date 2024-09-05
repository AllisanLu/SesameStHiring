package org.example.backend.user;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(int id);

    User createUser(User userDetails);

    User updateUser(int id, User userDetails);

    boolean deleteUser(int id);

    User getUserByUsername(String username);
}
