import {useEffect, useContext } from 'react'
import './App.css'
import { Context } from "./main";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";


const App = () => {

  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context);

  useEffect(()=>{
    const fetchUser = async() =>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials:true});
        setIsAuthorized(true);
        setUser(response.data.user);
      } catch (error) {
        console.log("You are not authorized");
        setIsAuthorized(false);
      }
    }
    fetchUser();
  },[isAuthorized]);

  
  return (
    <>
      <Router>
        <Navbar/> 
        <Routes>
          {/* Yeh hmne paths define kre hain hr option k liye */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
        <Toaster/>
      </Router>

    </>
  )
}

export default App
