import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import About from "./pages/about";
import Events from "./pages/events";
import Teams from "./pages/team";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Logout from "./pages/logout";

import Footer from "./components/Footer.js";
import ProtectedRoute from "./routes/ProtectedRoute";

import withRoot from './modules/withRoot';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<About />} />
                <Route element={<ProtectedRoute />}>
                     <Route
                    path="/events"
                    element={<Events />}
                       />
                
                </Route>
                <Route path="/team" element={<Teams />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route element={<ProtectedRoute />}>
                     <Route
                    path="/logout"
                    element={<Logout />}
                       />
                 </Route>
            </Routes>
            <Footer />
        </Router>

    );
}
 
export default withRoot(App);