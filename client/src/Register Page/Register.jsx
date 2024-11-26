import "./register.css";
import "../fonts/font.css";
import { useState } from "react";
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        phno:"",
        pass1:"",
        pass2:""
    });

    const [warnings, setWarnings] = useState({
        warn1:"none",
        warn2:"none",
        warn3:"none",
        warn4:"none"
    });

    const validateForm = () =>{
        let flag=true;
        if (!validator.isEmail(formData.email)){setWarnings(prev=>({...prev, warn1:"flex"})); flag=false}
        else{setWarnings(prev=>({...prev, warn1:"none"}))}

        if (formData.phno.length!==10){setWarnings(prev=>({...prev, warn2:"flex"})); flag=false}
        else{setWarnings(prev=>({...prev, warn2:"none"}))}

        if (formData.pass1.length<8){setWarnings(prev=>({...prev, warn3:"flex"})); flag=false}
        else{setWarnings(prev=>({...prev, warn3:"none"}))}

        if (formData.pass2!==formData.pass1){setWarnings(prev=>({...prev, warn4:"flex"})); flag=false}
        else{setWarnings(prev =>({...prev, warn4:"none"}))}

        return flag;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const isOk = validateForm();
        if (isOk){
            await fetch("http://localhost:5000/api/v1", {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({email:formData.email, password:formData.pass2, phno:formData.phno})
            })
            .then(res1 =>res1.json())
            .then(res2 =>{
                console.log(res2);
                if (res2.success){
                    toast.success("Account created successfully");
                    setTimeout(() =>{
                        navigate("/login");
                    }, 1000);
                }
                else{
                    toast.error(res2.message);
                }
            });
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
                        <p className="title">Sign up</p>
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
                            
                            <p className="label">Phone number <span style={{display:warnings.warn2}}>(Invalid phone number)</span></p>
                            <div className="numberInp">
                                <p>+91</p>
                                <input 
                                    type="number" 
                                    name="phno" 
                                    placeholder="e.g. 123467890" 
                                    value={formData.phno}
                                    onChange={e => setFormData(prev => ({...prev, phno:e.target.value}))}
                                    style={{borderColor:(warnings.warn2==="none"?"#33333333":"red")}}
                                />
                            </div>

                            <p className="label">Create password <span style={{display:warnings.warn3}}>(Should be minimun 8 characters)</span></p>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Minimum 8 character (include symbols and numbers)"
                                value={formData.pass1}
                                onChange={e => setFormData(prev => ({...prev, pass1:e.target.value}))}
                                style={{borderColor:(warnings.warn3==="none"?"#33333333":"red")}}
                            />

                            <p className="label"> Retype password <span style={{display:warnings.warn4}}>(Does not match the above password)</span></p>
                            <input 
                                type="password" 
                                name="password2" 
                                placeholder="Should be the same as above" 
                                value={formData.pass2}
                                onChange={e => setFormData(prev => ({...prev, pass2:e.target.value}))}
                                style={{borderColor:(warnings.warn4==="none"?"#33333333":"red")}}
                            />

                            <button type="submit">Continue</button>

                            <p className="lnk">Already have an account? <span onClick={() =>navigate("/login")}>Log in</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;