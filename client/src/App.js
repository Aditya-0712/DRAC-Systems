import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./Register Page/Register";
import Login from './Login Page/Login';
import Home from './Home Page/Home';
import PrivateRoute from './private/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            </Routes>
        </Router>
    );
}

export default App;