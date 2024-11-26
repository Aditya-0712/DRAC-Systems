import "../Register Page/register.css";
import { useState } from "react";
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const [warnings, setWarnings] = useState({
        warn1:"none",
        warn2:"none"
    });

    const validateForm = () =>{
        let flag=true;
        if (!validator.isEmail(formData.email)){setWarnings(prev=>({...prev, warn1:"flex"})); flag=false}
        else{setWarnings(prev=>({...prev, warn1:"none"}))}

        if (formData.password.length<8){setWarnings(prev=>({...prev, warn2:"flex"})); flag=false}
        else{setWarnings(prev=>({...prev, warn2:"none"}))}

        return flag;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const isOk = validateForm();
        if (isOk){
            await fetch("http://localhost:5000/api/v1/login", {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email:formData.email, password:formData.password})
            })
            .then(res1 =>res1.json())
            .then(res2 =>{
                console.log(res2);
                if (res2.success && res2.token){
                    localStorage.setItem("token", res2.token);
                    setTimeout(() =>{
                        navigate("/home");
                    }, 1000);
                }
                else{
                    toast.error(res2.message);
                }
            })
            .catch(err =>console.log(err));
        }
    }

    return (
        <div className="register">
            <div className="container">
                <div className="left">
                    <p>DRAC <span> Systems</span></p>
                    <p>Join us today!</p>
                    <p>Simplify and streamline<br></br>your processes</p>
                </div>
                <div className="right">
                    <div className="main">
                        <p className="title">Login</p>
                        <p className="welcome">Welcome to <span>VRV Security</span></p>

                        <form autoComplete="off" onSubmit={(e) =>handleSubmit(e)}>
                            <p className="label">Email address <span style={{display:warnings.warn1}}>(Invalid email address)</span></p>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="e.g. janedoe@example.com"
                                value={formData.email}
                                onChange={e => setFormData(prev => ({...prev, email:e.target.value}))}
                                style={{borderColor:(warnings.warn1==="none"?"#33333333":"red")}}
                            />

                            <p className="label">Password <span style={{display:warnings.warn2}}>(Should be minimun 8 characters)</span></p>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Your password"
                                value={formData.password}
                                onChange={e => setFormData(prev => ({...prev, password:e.target.value}))}
                                style={{borderColor:(warnings.warn2==="none"?"#33333333":"red")}}
                            />

                            <button type="submit">Continue</button>

                            <p className="lnk">Don't have an account? <span onClick={() =>navigate("/")}>Sign up</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;