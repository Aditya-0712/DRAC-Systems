import "./adduser.css";
import cross from "../images/cross.svg";
import { useState } from "react";
import toast from "react-hot-toast";

function AddUser({setFlag}){
    const [role, setRole] = useState("Administrator");
    const [formData, setFormData] = useState({
        name:"",
        email:""
    });

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await fetch("http://localhost:5000/api/v1/addPeople", {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({name:formData.name, role:role, personEmail:formData.email})
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            console.log(res2);
            if (res2.success){
                window.location="/home";
            }
            else{
                toast.error(res2.message);
            }
        })
        .catch(err =>console.log(err));
    }

    return (
        <div className="adduser">
            <div className="main">
                <div style={{margin:"0", width:"100%"}}>
                    <p className="header">Add people to your app</p>
                    <img src={cross} alt="cancel" className="cross" onClick={()=>setFlag(false)}/>
                </div>
                <p className="small">Assign a role</p>

                <div className="roleSelect" onClick={() =>setRole("Administrator")}>
                    <span style={{backgroundColor:role==="Administrator"?"blue":"transparent"}}></span>
                    <div><p>Administrator</p><p>Can modify all app settings, grant app roles, create test apps.</p></div>
                </div>
                <div className="roleSelect" onClick={() =>setRole("Developer")}>
                    <span style={{backgroundColor:role==="Developer"?"blue":"transparent"}}></span>
                    <div><p>Developer</p><p>Can modify all app settings except app secret and app removal, create test apps, users, and pages.</p></div>
                </div>
                <div className="roleSelect" onClick={() =>setRole("Tester")}>
                    <span style={{backgroundColor:role==="Tester"?"blue":"transparent"}}></span>
                    <div><p>Tester</p><p>Can test all permissions, features, and products.</p></div>
                </div>
                <div className="roleSelect" onClick={() =>setRole("Analyst")}>
                    <span style={{backgroundColor:role==="Analyst"?"blue":"transparent"}}></span>
                    <div><p>Analyst</p><p>Can view app insights.</p></div>
                </div>

                <form autoComplete="off" onSubmit={(e) =>handleSubmit(e)}>
                    <p className="label">Name</p>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="e.g Jane Doe"
                        value={formData.name}
                        onChange={e =>setFormData(prev =>({...prev, name:e.target.value}))}
                    />

                    <p className="label">Email Address</p>
                    <input 
                        type="email"
                        name="email"
                        placeholder="e.g janedoe@example.com"
                        value={formData.email}
                        onChange={e =>setFormData(prev =>({...prev, email:e.target.value}))}
                    />

                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;