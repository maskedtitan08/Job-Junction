import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../main";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

    // Function to handle the form
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/api/v1/user/login", {email,password,role }, { withCredentials: true, headers: { "Content-Type": "application/json", }, });
            toast.success(data.message);
            setEmail("")
            setPassword("")
            setRole("");
            setIsAuthorized(true);
            // setUser({ ...user, ...data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    if (isAuthorized) {
        return <Navigate to={"/"} />
    }
    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="" alt="logo" />
                        <h3>Login</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Login As</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Employer">Employer</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="inputTag">
                            <label>Email</label> {/*You can use placeholder instead of label tag*/}
                            <div>
                               <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                               <input type="password" value = {password} onChange={(e)=> setPassword(e.target.value)} required/>
                            </div>
                        </div>
                        
                        <button type="submit" onClick={handleLogin}>Login</button>
                        <Link to={'/register'}>Register</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="" alt="login" />
                </div>
            </section>
        </>
    )

}

export default Login;