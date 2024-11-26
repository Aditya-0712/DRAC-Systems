import "./configure.css";
import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import toast from "react-hot-toast";

function Configure(){
    const [name, setName] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await fetch("http://localhost:5000/api/v1/configureBusiness", {
            method: "PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({name:name})
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            console.log(res2);
            if (res2.success){
                toast.success("Business name changed");
                setTimeout(() =>{
                    window.location = "/home";
                }, 1000);
            }
            else{
                toast.error(res2.message);
            }
        })
        .catch(err =>console.log(err));
    }

    return(
        <div style={{flexDirection:"column"}}>
            <Topbar />
            <div className="configure">
                <Sidebar />
                <div style={{flexDirection:"column", width:"80.28vw", margin:"0"}}>
                    <form autoComplete="off" onSubmit={(e) =>handleSubmit(e)}>
                        <p className="label">Change business name</p>
                        <input 
                            type="text"
                            name="name"
                            placeholder="e.g Newtech Systems"
                            value={name}
                            onChange={(e) =>setName(e.target.value)}
                        />

                        <button type="submit">Change name</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Configure;