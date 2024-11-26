import "./businesses.css";
import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Businesses(){
    const [businessData, setBusinessData] = useState([]);

    useEffect(() =>{
        const fetchBusinesses = async () =>{
            await fetch("http://localhost:5000/api/v1/getBusinesses", {
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
                    setBusinessData(res2.data);
                }
                else{
                    toast.error(res2.message);
                }
            })
            .catch(err =>console.log(err));
        }

        fetchBusinesses();
    }, []);

    const renderBusinesses = businessData.map((x, ind) =>{
        return (
            <div className="card" key={ind}>
                <p className="id">{x.businessId}</p>
                {x.name===""?<p>Name: <span>No name</span></p>:<p>Name: <span>{x.name}</span></p>}
                <p>Created By: <span>{x.createdBy}</span></p>
                <p>Your Role: <span>{x.role}</span></p>

                <div className="options">
                    <p>View data</p>
                    {(x.role==="Administrator" || x.role==="Developer") && <p style={{backgroundColor:"#7752FE", color:"white"}}>Modify Variables</p>}
                    {(x.role==="Administrator" || x.role==="Tester" || x.role==="Developer") && <p style={{backgroundColor:"#424769", color:"#C499F3"}}>Test Products</p>}
                    {x.role==="Administrator" && <p style={{backgroundColor:"blue", color:"white"}}>Add People +</p>}
                </div>
            </div>
        );
    });

    return (
        <div style={{flexDirection:"column"}}>
            <Topbar />
            <div className="businesses">
                <Sidebar />
                <div style={{flexDirection:"column", width:"80.28vw", margin:"0"}}>
                    {renderBusinesses}
                </div>
            </div>
        </div>
    );
}

export default Businesses;