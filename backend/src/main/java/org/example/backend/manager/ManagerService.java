package org.example.backend.manager;

import java.util.List;

public interface ManagerService {

    List<Manager> getAllManagers();

    Manager getManagerById(int id);

    Manager createManager(Manager manager);

    Manager updateManager(int id, Manager manager);

    boolean deleteManager(int id);
}
