import "./businesses.css";
import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";

function Businesses(){
    return (
        <div style={{flexDirection:"column"}}>
            <Topbar />
            <div className="businesses">
                <Sidebar />
            </div>
        </div>
    );
}

export default Businesses;