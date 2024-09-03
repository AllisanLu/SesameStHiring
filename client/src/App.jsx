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

import { getUser } from './database.js'


function App() {

  const [currentUser, setCurrentUser] = useState({});

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

  const testCandidates= [
    {
      name: "Allison",
      id: 5,
      username: "allisan",
      password: "pass",
      email: "email@e.com",
      phone: "770-777-1234",
      address: "123 street",
      resume: "Wahoo experience....dkfjadlkfjklsjdfkajdfkjadlkfjalsdjflkajdlkfjalksdjflkajdlskfjalkdjdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf"
    }
  ]

  const getuser = () => {
    getUser(5).then(user => setCurrentUser(user))
  }

  useEffect(() => {
    getuser();
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="candidate" element={<CandidatePage user={currentUser} setUser={setCurrentUser}/>} >
            <Route path="joblistings" element={<JobList user={currentUser} jobs={testJobs} />}></Route>
            <Route path="applications" element={<ApplicationList apps={testApps} />} ></Route>
          </Route>

          <Route path="admin" element={<AdminPage user={testAdmin} />} />
          
          <Route path="manager" element={<ManagerPage user={testManager} />} >
            <Route path="joblistings" element={<JobList user={testManager} jobs={testJobs} />}></Route>
            <Route path="candidates" element={<CandidateList candidates={testCandidates}/>} ></Route>
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
