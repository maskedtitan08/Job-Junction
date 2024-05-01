import { useContext, useEffect, useState } from "react";
import { Context } from "../../main"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";
import JobSeekerCard from "./JobSeekerCard"
import EmployerCard from "./EmployerCard"

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        try {
            if (user && user.role === "Employer") {
                axios.get("http://localhost:4000/api/v1/application/employer/getall", { withCredentials: true }).then((res) => {
                    setApplications(res.data.applications)
                })
            }
            else {
                axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", { withCredentials: true }).then((res) => {
                    setApplications(res.data.applications)
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }, [isAuthorized])

    const deleteApplication = (id) => {
        try {
            axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true, }).then((res) => {
                toast.success(res.data.message);

                //ahi yeh filtering aur prev state wala concept thoda doubt hai
                setApplications((prevApplication) =>
                    prevApplication.filter((application) => application._id !== id)
                );
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const openModal = (imageUrl) => {
        setImageUrl(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (!isAuthorized) {
        navigateTo("/login");
    }
    return (
        <>
            <div className="my_applications page">
                {user && user.role === "Job Seeker" ? (
                    <div className="container">
                        <h3>My  Applications</h3>
                     
                        {
                            applications.length <= 0 ? (<h4>No applications  yet!</h4>) :
                                (
                                    applications.map((element) => {
                                        return (<JobSeekerCard element={element} key={element._id} deleteApplication={deleteApplication} openModal={openModal} />)
                                    })
                                )
                        }
                    </div>
                ) : (
                    <div className="container">
                        <h3>Job Applications</h3>
                        {applications && applications.map(element => {
                            return <EmployerCard element={element} key={element._id} openModal={openModal} />
                        })}
                    </div>
                )}
                {
                    modalOpen && (
                        <ResumeModal imageUrl={imageUrl} onClose={closeModal} />
                    )
                }
            </div>
        </>
    )
}

export default MyApplications;