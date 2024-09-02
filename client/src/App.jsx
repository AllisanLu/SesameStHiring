import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ManagerPage from './pages/ManagerPage';
import CandidatePage from './pages/CandidatePage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import JobList from './components/JobList';
import ApplicationList from './components/candidate/ApplicationList';
import CandidateList from './components/manager/CandidateList';


function App() {

  const [currentUser, setCurrentUser] = useState({});

  const testManager = {
    id: 1,
    username: "Joe",
    password: "pass"
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
      job: {
        title: "CS",
        description: "writing code",
        manager: 5,
        id: 1
      }
    }
  ]

  const getuser = () => {
    fetch("http://localhost:8080/api/users/5")
    .then(response => response.json())
    .then(user => setCurrentUser(user))
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

          <Route path="candidate" element={<CandidatePage user={currentUser} />} >
            <Route path="joblistings" element={<JobList user={currentUser} jobs={testJobs} />}></Route>
            <Route path="applications" element={<ApplicationList apps={testApps} />} ></Route>
          </Route>

          <Route path="admin" element={<h1>Admin</h1>} />
          
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
