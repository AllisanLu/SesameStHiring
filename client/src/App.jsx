import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 


function App() {

  const testuser = {
    username: "AllisanLu",
    password: "wahoo",
    email: "wahoo@example.com"
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "home",
      element: <HomePage user={testuser}></HomePage>,
    },
    {
      path: "register",
      element: <RegisterPage />
    }
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  )
}

export default App
