import "./home.css";
import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";
import Table from "../components/Table";
import AddUser from "../components/AddUser";
import { useState } from "react";

function Home(){
    const [flag, setFlag] = useState(false);

    return (
        <div style={{flexDirection:"column"}}>
            {flag && <AddUser setFlag={setFlag}/>}
            <Topbar />
            <div className="home">
                <Sidebar />
                <div style={{flexDirection:"column", margin:"2.629vw auto 0 auto"}}>
                    <p className="title">Manage roles</p>
                    <p className="desc">These roles allow you to control which people have permission to edit and view your app.</p>
                    <Table setFlag={setFlag}/>
                </div>
            </div>
        </div>
    );
}

export default Home;