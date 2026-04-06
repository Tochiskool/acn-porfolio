import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    type: '',
    phoneNumber: '',
    textArea: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null); // accessibility: manage focus

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/createContacts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactInfo),
        }
      );

      if (!response.ok) throw new Error('Failed to submit contact form');

      await response.json();
      setSubmitted(true);
      setContactInfo({
        name: '',
        email: '',
        type: '',
        phoneNumber: '',
        textArea: '',
      });
      formRef.current?.focus(); // accessibility: move focus to confirmation
    } catch (error) {
      console.error('Error submitting form:', error.message);
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => navigate('/'), 3000);
  };

  if (submitted) {
    return (
      <div className="submitted">
        <p tabIndex={-1} ref={formRef}>
          Thank you for contacting me! I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="contactContainer">
      <h1 data-aos="fade-right">Leave a message</h1>
      <div data-aos="flip-up" className="formContainer">
        <form onSubmit={handleSubmit} aria-label="Contact form">
          <div className="input-style">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={contactInfo.name}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={contactInfo.email}
              required
            />

            <label htmlFor="type">Contact Type:</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={contactInfo.type}
              required
            >
              <option value="" disabled>
                Choose type
              </option>
              <option value="Friend">Friend</option>
              <option value="Employer">Employer</option>
            </select>

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              value={contactInfo.phoneNumber}
              required
              pattern="[0-9]+"
            />

            <label htmlFor="textArea">Message:</label>
            <textarea
              id="textArea"
              name="textArea"
              onChange={handleChange}
              value={contactInfo.textArea}
              required
            />
          </div>

          <button className="btn-breath" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
