import { useContext, useEffect, useState } from "react";
// import JobDetails from "./JobDetails";
// import MyJobs from "./MyJobs";
// import PostJob from "./PostJob";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Jobs = () => {
    const [jobs,setJobs] = useState([]);
    const {isAuthorized} = useContext(Context)
    const navigateTo = useNavigate();

    useEffect(()=>{
        try {
            axios.get("http://localhost:4000/api/v1/job/getall",{withCredentials: true}).then((res)=>{
                setJobs(res.data);
                // console.log(res.status);
            })
        } catch (error) {
            console.log(error);
        }
    },[])
    if(!isAuthorized){
        navigateTo("/login");
    }
    return(
        <>
            <section className="jobs page">
                <div className="container">
                    <h1>Jobs Currently Available</h1>
                    <div className="banner">
                        {jobs.jobs && jobs.jobs.map((element)=>{
                            return(
                                <div className="card" key = {element._id}>
                                    <p>Title : {element.title}</p>
                                    <p>Category : {element.category}</p>
                                    <p>Country : {element.country}</p>
                                    <Link to={`/job/${element._id}`}>Job details</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </> 
    )

}

export default Jobs ;