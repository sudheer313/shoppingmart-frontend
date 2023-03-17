import React from "react";
import "../Contactus.css";
const ContactUs = () => {
  return (
    <div>
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <label for="message">Message</label>
        <input
          type="message"
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
