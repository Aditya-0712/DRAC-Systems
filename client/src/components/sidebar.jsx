import "./sidebar.css";
import home from "../images/home.svg";
import business from "../images/business.svg";
import profile from "../images/profile.svg";
import envelope from "../images/envelope.svg";
import { useNavigate } from 'react-router-dom';

function Sidebar(){
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="opt" style={{marginTop:"2.629vw"}} onClick={() =>navigate("/home")} ><img src={home} alt="home" /><p>Home</p></div>
            <div className="opt"><img src={business} alt="business" /><p>Configure business</p></div>
            <div className="opt"><img src={profile} alt="profile" /><p>Edit profile</p></div>
            <div className="opt"><img src={envelope} alt="business" /><p>Associated businesses</p></div>
        </div>
    );
}

export default Sidebar;