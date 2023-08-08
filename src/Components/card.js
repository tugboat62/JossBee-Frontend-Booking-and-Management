import React from "react";


export default function Card() {
    return (
        <div class="container mt-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Booking Details</h5>
                    <p class="card-text">Booking Date: 2023-07-09</p>
                    <p class="card-text">Payment Method: Credit Card</p>
                    <p class="card-text">Payment Amount: $200</p>
                    <p class="card-text">User Details:</p>
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">Name: John Doe</p>
                            <p class="card-text">Email: john.doe@gmail.com</p>
                            <p class="card-text">Phone Number: 1234567890</p>
                        </div>
                    </div>
                    <p class="card-text">Number of Customers: 2</p>
                    <p class="card-text">Status: Confirmed</p>
                    <p class="card-text">Review: Beautiful place to stay!</p>
                    <p class="card-text">Rating: 4.5 stars</p>
                </div>
            </div>
        </div>
    )
}