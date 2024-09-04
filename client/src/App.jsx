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
import ManagerList from './components/admin/ManagerList.jsx';

import ManagerView from './components/manager/ManagerView.jsx';
import CandidateView from './components/candidate/CandidateView.jsx';

import { getUser, getUsers, getCandidates, getManagers, getManager, getCandidate } from './database.js'


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

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
    getUser(1).then(user => {
      if (user.type === "candidate") {
        getCandidate(user.id).then(candidate => {
          if (candidate) {
            setCurrentUser(candidate)
            return
          }
        })
      } else if (user.type === "manager") {
        getManager(user.id).then(manager => {
          if (manager) {
            setCurrentUser(manager)
            return
          }
        })
      }
      setCurrentUser(user)
    })
  }

  const loadUsers = () => {
    getUsers()
      .then(users => setUsers(users))
  }

  const loadCandidates = () => {
    getCandidates().then(res => setCandidates(res));
  }

  const loadManagers = () => {
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
          <Route path="register" element={<RegisterPage setCurrentUser={setCurrentUser} />} />

          {currentUser.type === "candidate" ? <Route path="candidate" element={<CandidatePage user={currentUser} setUser={setCurrentUser} />} >
            <Route path="" element={<CandidateView user={currentUser} setUser={setCurrentUser} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={testJobs} />}></Route>
            <Route path="applications" element={<ApplicationList apps={testApps} />} ></Route>
          </Route> : null }

          <Route path="admin" element={<AdminPage user={testAdmin} />} >
            <Route path="users" element={<UserList users={users} loadUsers={loadUsers} />} />
            <Route path="candidates" element={<CandidateList user={testAdmin} candidates={candidates} loadCandidates={loadCandidates} />} />
            <Route path="joblistings" element={<JobList user={testAdmin} jobs={testJobs} />} />
            <Route path="managers" element={<ManagerList managers={managers} loadManagers={loadManagers} />} />
          </Route>

          {currentUser.type === "manager" ?<Route path="manager" element={<ManagerPage user={currentUser} setUser={setCurrentUser} />} >
            <Route path="" element={<ManagerView user={currentUser} setUser={setCurrentUser} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={testJobs} />}></Route>
            <Route path="candidates" element={<CandidateList user={currentUser} candidates={candidates} loadCandidates={loadCandidates} />} ></Route>
          </Route> : null }

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
