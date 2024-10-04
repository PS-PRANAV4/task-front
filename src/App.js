import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import TaskCalander from './pages/calenderView';
import TaskList from './pages/tasklist';
import PrivateRoute from './utils/restric';
import Signup from './pages/signup';
import LoginOtp from './pages/loginOtp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/otp" element={<LoginOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/calender" 
          element={
            <PrivateRoute>
              <TaskCalander />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/list" 
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
