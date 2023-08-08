import React from 'react'
import '../Styles/contact.css'

export default function Contact() {
    return (
        <main class="contact-page">
            <section class="contact-form">
                <h2>Contact Us</h2>
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>

                    <button type="submit">Send Message</button>
                </form>
            </section>

            <section class="contact-details">
                <h2>Contact Details</h2>
                <p><strong>Email:</strong> contact@example.com</p>
                <p><strong>Phone:</strong> +1 123-456-7890</p>
                <p><strong>Address:</strong> 123 Main Street, City, Country</p>
            </section>
        </main>
 )
}