import { FaUserPlus } from "react-icons/fa";
import {MdFindInPage} from "react-icons/md"
import {IoMdSend} from "react-icons/io"
import {Link} from "react-router-dom"

const HowltWorks = () => {

    return(
        <div className="howitworks">
            <div className="container">
                <h3>How this platform works</h3>
                <div className="banner">
                    <div className="card">
                        <FaUserPlus/>
                        <Link to="register"><p>Create Account</p></Link>
                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nostrum voluptates corrupti explicabo quas tempore doloremque dolores rem modi amet, aspernatur eum maxime ab laboriosam ratione inventore dolor excepturi veritatis!</p>
                    </div>
                    <div className="card">
                        <MdFindInPage/>
                        <Link to="/job/getall"><p>Find a Job / Post a Job</p></Link>
                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nostrum voluptates corrupti explicabo quas tempore doloremque dolores rem modi amet, aspernatur eum maxime ab laboriosam ratione inventore dolor excepturi veritatis!</p>
                    </div>
                    <div className="card">
                        <IoMdSend/>
                        <p></p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nostrum voluptates corrupti explicabo quas tempore doloremque dolores rem modi amet, aspernatur eum maxime ab laboriosam ratione inventore dolor excepturi veritatis!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowltWorks ;