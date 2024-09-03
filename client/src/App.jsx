import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ManagerPage from './pages/ManagerPage';
import CandidatePage from './pages/CandidatePage';
import AdminPage from './pages/AdminPage.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import JobList from './components/JobList';
import ApplicationList from './components/candidate/ApplicationList';
import CandidateList from './components/manager/CandidateList';
import UserList from './components/admin/UserList.jsx';

import { getUser, getUsers, getCandidates, getManagers } from './database.js'


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  const testManager = {
    id: 1,
    username: "Joe",
    password: "pass",
    type: "manager"
  }

  const testAdmin = {
    id: 10,
    username: "Admin",
    password: "admin",
    type: "admin"
  }

  const testJobs = [
    {
      title: "CS",
      description: "writing code",
      manager: 5,
      id: 1
    },
    {
      title: "HR",
      description: "hiring people",
      manager: 1,
      id: 2
    }
  ];
  const testApps = [
    {
      id: 1,
      job: {
        title: "CS",
        description: "writing code",
        manager: 4,
        id: 1
      },
      candidate: "Allison"
    },
    {
      id: 2,
      job: {
        title: "HR",
        description: "hiring people",
        manager: 1,
        id: 1
      },
      candidate: "Jered"
    }
  ];

  const loadPage = async function () {
    await loadUser();

    // if (currentUser?.type === "manager") {
    await loadCandidates()
    // }
    await loadUsers();
    await loadManagers();
  }

  const loadUser = () => {
    getUser(1).then(user => setCurrentUser(user))
  }

  const loadUsers = () => {
    getUsers()
      .then(users => setUsers(users))
  }

  const loadCandidates = () => {
    getCandidates().then(res => setCandidates(res));
  }

  const loadManagers =  () => {
     getManagers().then(res => setManagers(res));
  }

  useEffect(() => {
    loadPage();
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="candidate" element={<CandidatePage user={currentUser} setUser={setCurrentUser} />} >
            <Route path="joblistings" element={<JobList user={currentUser} jobs={testJobs} />}></Route>
            <Route path="applications" element={<ApplicationList apps={testApps} />} ></Route>
          </Route>

          <Route path="admin" element={<AdminPage user={testAdmin} />} >
            <Route path="users" element={<UserList users={users} setUsers={setUsers} />} />
            <Route path="candidates" element={<CandidateList user={testAdmin} candidates={candidates} loadCandidates={loadCandidates} />} />
            <Route path="joblistings" element={<JobList user={testAdmin} jobs={testJobs} />} />
            <Route path="managers" element={<ManagerList user={testAdmin} managers={managers} />} />
          </Route>

          <Route path="manager" element={<ManagerPage user={testManager} />} >
            <Route path="joblistings" element={<JobList user={testManager} jobs={testJobs} />}></Route>
            <Route path="candidates" element={<CandidateList user={testManager} candidates={candidates} loadCandidates={loadCandidates} />} ></Route>
          </Route>

          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
