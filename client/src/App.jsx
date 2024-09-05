import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ManagerPage from './pages/ManagerPage';
import CandidatePage from './pages/CandidatePage';
import AdminPage from './pages/AdminPage.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import JobList from './components/JobList';
import ApplicationList from './components/candidate/ApplicationList';
import CandidateList from './components/manager/CandidateList';
import UserList from './components/admin/UserList.jsx';
import ManagerList from './components/admin/ManagerList.jsx';

import ManagerView from './components/manager/ManagerView.jsx';
import CandidateView from './components/candidate/CandidateView.jsx';

import { getUser, getUsers, getCandidates, 
        getManagers, getManager, getCandidate, 
        getJobs, getApplications } from './database.js'


function App() {

  const [currentUser, setCurrentUser] = useState();
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [applications, setApplications] = useState([]);

  const [jobs, setJobs] = useState([]);

  const testAdmin = {
    id: 10,
    username: "Admin",
    password: "admin",
    type: "admin"
  }

  const loadPage = async function () {
    if (currentUser) {
      if (currentUser.type != "ROLE_CANDIDATE") {
        await loadCandidates();

        if (currentUser.type != "ROLE_MANAGER") {
          await loadUsers();
          await loadManagers();
        }
      }
      await loadJobs();
      await loadApplications();
    }
  }

  const loadUser = (i) => {
    getUser(i).then(user => {
      if (user.type === "ROLE_CANDIDATE") {
        getCandidate(user.id).then(candidate => {
          if (candidate) {
            setCurrentUser(candidate)
            return
          }
        })
      } else if (user.type === "ROLE_MANAGER") {
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
    getUsers().then(res => setUsers(res))
  }

  const loadCandidates = () => {
    getCandidates().then(res => setCandidates(res));
  }

  const loadManagers = () => {
    getManagers().then(res => setManagers(res));
  }

  const loadJobs = () => {
    getJobs().then(res => setJobs(res));
  }

  const loadApplications = () => {
    getApplications().then(res => setApplications(res));
  }

  // useEffect(() => {
  //   loadPage();
  // }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage loadUser={loadUser} loadPage={loadPage} />} />
          <Route path="register" element={<RegisterPage setCurrentUser={setCurrentUser} />} />

          {currentUser?.type === "ROLE_CANDIDATE" ? <Route path="candidate" element={<CandidatePage user={currentUser} setUser={setCurrentUser} />} >
            <Route path="" element={<CandidateView user={currentUser} setUser={setCurrentUser} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={jobs} loadJobs={loadJobs} loadApplications={loadApplications} />}></Route>
            <Route path="applications" element={<ApplicationList user={currentUser} apps={applications} loadApplications={loadApplications} loadJobs={loadJobs}/>} ></Route>
          </Route> : null }

          <Route path="admin" element={<AdminPage user={testAdmin} />} >
            <Route path="users" element={<UserList users={users} loadUsers={loadUsers} />} />
            <Route path="candidates" element={<CandidateList user={testAdmin} candidates={candidates} loadCandidates={loadCandidates} />} />
            <Route path="joblistings" element={<JobList user={testAdmin} jobs={jobs} loadJobs={loadJobs} />} />
            <Route path="managers" element={<ManagerList managers={managers} loadManagers={loadManagers} />} />
            <Route path="applications" element={<ApplicationList user={testAdmin} apps={applications} loadApplications={loadApplications} loadJobs={loadJobs} />} />
          </Route>

          {currentUser?.type === "ROLE_MANAGER" ?<Route path="manager" element={<ManagerPage user={currentUser} setUser={setCurrentUser} />} >
            <Route path="" element={<ManagerView user={currentUser} setUser={setCurrentUser} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={jobs} loadJobs={loadJobs} />}></Route>
            <Route path="applications" element={<ApplicationList auser={currentUser} upps={applications} loadApplications={loadApplications} />} ></Route>
            <Route path="candidates" element={<CandidateList user={currentUser} candidates={candidates} loadCandidates={loadCandidates} />} ></Route>
          </Route> : null }

          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
