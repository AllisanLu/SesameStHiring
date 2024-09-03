package org.example.backend.manager;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.example.backend.user.User;
import org.example.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public ManagerServiceImpl(ManagerRepository managerRepository, UserRepository userRepository) {
        this.managerRepository = managerRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @Override
    public Manager getManagerById(int id) {
        return managerRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Manager createManager(Manager manager) {
        Optional<User> userOptional = userRepository.findById(manager.getId());

        if (userOptional.isPresent()) {

            managerRepository.insertManager(
                    manager.getId()
            );

            entityManager.flush();
            entityManager.clear();

            return managerRepository.findById(manager.getId()).orElse(null);
        }

        throw new IllegalArgumentException("User with ID " + manager.getId() + " does not exist.");
    }

    @Override
    public Manager updateManager(int id, Manager manager) {
        Optional<Manager> managerOptional = managerRepository.findById(id);
        if (managerOptional.isPresent()) {
            Manager managerToUpdate = managerOptional.get();

            return managerRepository.save(managerToUpdate);
        }
        return null;
    }

    @Override
    public boolean deleteManager(int id) {
        if (managerRepository.existsById(id)) {
            managerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
