import "./topbar.css";
import account from "../images/account.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Topbar(){
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        businessId:"",
        email:""
    });

    const logout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() =>{
        const fetchUserData = async () =>{
            await fetch("http://localhost:5000/api/v1/getUserData", {
                method: "GET",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }                
            })
            .then(res1 =>res1.json())
            .then(res2 =>{
                console.log(res2);
                if (res2.success){
                    setUserData({businessId:res2.data.businessId, email:res2.data.email});
                }
            })
            .catch(err =>console.log(err));
        }

        fetchUserData();
    }, []);

    return (
        <div className="topbar">
            <div className="account">
                <img src={account} alt="account" />
                <p>{userData.email}</p>
            </div>

            <p className="app">Business ID: <span>{userData.businessId}</span></p>

            <p className="role">Your role: <span>Administrator</span></p>

            <p className="logout" onClick={logout}>Logout</p>

            <p className="logo">RBAC <span>Systems</span></p>
        </div>
    );
}

export default Topbar;