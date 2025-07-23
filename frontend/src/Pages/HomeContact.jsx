import React from 'react';

const HomeContact = () => {
  return (
    <section className="home-contact">
      <h2>Contact Us</h2>
      <p>
        Have questions or feedback?<br />
        <strong>Email:</strong> support@jobportal.com
      </p>
      <form className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="3" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default HomeContact;
