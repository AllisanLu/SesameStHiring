import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import JobList from './components/JobList';
import CandidatePage from './pages/CandidatePage';
import ApplicationList from './components/candidate/ApplicationList';


function App() {

  const testuser = {
    username: "AllisanLu",
    password: "wahoo",
    type: "candidate",
    email: "wahoo@example.com"
  }
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="user" element={<CandidatePage user={testuser} />} >
            <Route path="joblistings" element={<JobList />}></Route>
            <Route path="applications" element={<ApplicationList />} ></Route>
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<h1>Admin</h1>} />
          <Route path="manager" element={<h1>Manager</h1>} />
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
