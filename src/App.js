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


export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="user/:userId" element={<UserHome />} />
                <Route path="owner/bookings/:houseId" element={<BookingHistory />} />
                <Route path="house/:houseId" element={<HouseDetails />} />
                <Route path="*" element={<div className="error-page"><h1> 404 Not Found</h1></div>} />
                {/* <Route path="/house/:houseId">element={<HouseDetails />}</Route> */}
            </Routes>
            <Footer />
        </div>
    )
}