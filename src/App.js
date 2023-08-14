import React from "react";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import About from "./Components/about";
import Contact from "./Components/contact";
import {Routes, Route} from "react-router-dom";
import Home from "./Components/houses";
import Login from "./Components/login";
import UserHome from "./Components/userHome";
import HouseDetails from "./Components/houseDetails";
import "./App.css";
import BookingHistory from "./Components/bookingHistory";
import { useState } from "react";
import Notifications from "./Components/notifications";
import { RequiureAuth } from "./Components/requireAuth";
import { AuthProvider } from "./Components/auth";


export default function App() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    return (
        <div>
            <AuthProvider>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="user" element={<RequiureAuth><UserHome /></RequiureAuth>} />
                    <Route path="owner/bookings/:houseId" element={<RequiureAuth><BookingHistory /></RequiureAuth>} />
                    <Route path="house/:houseId" element={<HouseDetails />} />
                    <Route path="user/notifications" element={<RequiureAuth><Notifications /></RequiureAuth>} />
                    <Route path="*" element={<div className="error-page"><h1> 404 Not Found</h1></div>} />
                    {/* <Route path="/house/:houseId">element={<HouseDetails />}</Route> */}
                </Routes>
                <Footer />
            </AuthProvider>
        </div>
    )
}