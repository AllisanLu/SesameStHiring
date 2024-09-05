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
  const [authToken, setAuthToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [applications, setApplications] = useState([]);

  const [jobs, setJobs] = useState([]);

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
    getUser(i, authToken).then(user => {
      if (user.type === "ROLE_CANDIDATE") {
        getCandidate(user.id, authToken).then(candidate => {
          if (candidate) {
            setCurrentUser(candidate)
          }
        })
      } else if (user.type === "ROLE_MANAGER") {
        getManager(user.id, authToken).then(manager => {
          if (manager) {
            setCurrentUser(manager)
          }
        })
      } else {
        setCurrentUser(user)
      }
    })
  }

  const loadUsers = () => {
    getUsers(authToken).then(res => setUsers(res))
  }

  const loadCandidates = () => {
    getCandidates(authToken).then(res => setCandidates(res));
  }

  const loadManagers = () => {
    getManagers(authToken).then(res => setManagers(res));
  }

  const loadJobs = () => {
    getJobs(authToken).then(res => setJobs(res));
  }

  const loadApplications = () => {
    getApplications(authToken).then(res => setApplications(res));
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage setToken={setAuthToken} loadUser={loadUser} loadPage={loadPage} />} />
          <Route path="register" element={<RegisterPage setToken={setAuthToken} loadUser={loadUser} loadPage={loadPage} />} />

          {currentUser?.type === "ROLE_CANDIDATE" ? <Route path="candidate" element={<CandidatePage user={currentUser} setUser={setCurrentUser} token={authToken} />} >
            <Route path="" element={<CandidateView user={currentUser} setUser={setCurrentUser} token={authToken} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={jobs} loadJobs={loadJobs} loadApplications={loadApplications} token={authToken} />}></Route>
            <Route path="applications" element={<ApplicationList user={currentUser} apps={applications} loadApplications={loadApplications} loadJobs={loadJobs} token={authToken} />} ></Route>
          </Route> : null }

          {currentUser?.type === "ROLE_ADMIN" ? <Route path="admin" element={<AdminPage user={currentUser} />} >
            <Route path="users" element={<UserList users={users} loadUsers={loadUsers} token={authToken} />} />
            <Route path="candidates" element={<CandidateList user={currentUser} candidates={candidates} loadCandidates={loadCandidates} token={authToken} />} />
            <Route path="joblistings" element={<JobList user={currentUser} jobs={jobs} loadJobs={loadJobs} token={authToken} />} />
            <Route path="managers" element={<ManagerList managers={managers} loadManagers={loadManagers} token={authToken} />} />
            <Route path="applications" element={<ApplicationList user={currentUser} apps={applications} loadApplications={loadApplications} loadJobs={loadJobs} token={authToken} />} />
          </Route> : null }

          {currentUser?.type === "ROLE_MANAGER" ?<Route path="manager" element={<ManagerPage user={currentUser} setUser={setCurrentUser} token={authToken} />} >
            <Route path="" element={<ManagerView user={currentUser} setUser={setCurrentUser} token={authToken} />}></Route>
            <Route path="joblistings" element={<JobList user={currentUser} jobs={jobs} loadJobs={loadJobs} token={authToken} />}></Route>
            <Route path="applications" element={<ApplicationList user={currentUser} apps={applications} loadApplications={loadApplications} token={authToken} />} ></Route>
            <Route path="candidates" element={<CandidateList user={currentUser} candidates={candidates} loadCandidates={loadCandidates} token={authToken} />} ></Route>
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
