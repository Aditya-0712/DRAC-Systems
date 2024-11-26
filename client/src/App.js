import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./Register Page/Register";
import Login from './Login Page/Login';
import Home from './Home Page/Home';
import PrivateRoute from './private/PrivateRoute';
import Businesses from './Businesses Page/Businesses';
import Configure from './Configure Page/Configure';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Toaster position='top-center' />
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/associatedBusinesses" element={<PrivateRoute element={<Businesses />} />} />
                    <Route path="/configureBusiness" element={<PrivateRoute element={<Configure />} />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;