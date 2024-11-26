import "./table.css";
import trash from "../images/trash.svg";
import { useState, useEffect } from "react";

function Table({setFlag}){
    const [tuples, setTuples] = useState([]);

    useEffect(() =>{
        const fetchPeople = async () =>{
            await fetch("http://localhost:5000/api/v1/getPeople", {
                method:"GET",
                headers: {'Content-Type':'application/json', 'Authorization':`Bearer ${localStorage.getItem("token")}`}
            })
            .then(res1 =>res1.json())
            .then(res2 =>{
                console.log(res2);
                if (res2.success){
                    setTuples(res2.data);
                }
            })
            .catch(err =>console.log(err));
        }

        fetchPeople();
    }, []);
    
    const renderTuples = tuples.map((x, ind) =>{
        return (<div className="tuple" key={ind}><p>{x.name}</p><p>{x.role}</p><img src={trash} alt="delete" /></div>);
    });

    return (
        <div className="table">
            <div style={{margin:"0", width:"100%"}}>
                <p className="title">All roles</p>
                <p className="add" onClick={() =>setFlag(true)}>Add People +</p>
            </div>
            <div className="attr"><p>Name</p><p>Role</p><p>Actions</p></div>
            <div style={{width:"100%", margin:"0", flexDirection:"column"}}>
                {renderTuples}
            </div>
        </div>
    );
}

export default Table;