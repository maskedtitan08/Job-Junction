import {FaLinkedin,FaTwitter} from "react-icons/fa"
import {RiInstagramFill,RiTwitterFill} from 'react-icons/ri'
import { Context } from "../../main"
import { useContext } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    const {isAuthorized} = useContext(Context);
    return(
        <footer className={isAuthorized ? "footerShow" : "footerHide"}>
            <div>
                <Link to = {""} target ="_blank"><FaLinkedin/></Link>
                <Link to = {""} target ="_blank"><FaTwitter/></Link> 
                <Link to = {""} target ="_blank"><RiInstagramFill/></Link>
            </div>
        </footer>
    )
}

export default  Footer;