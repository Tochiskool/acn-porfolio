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
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/createContacts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactInfo),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      await response.json();

      setSubmitted(true);
      setContactInfo({
        name: '',
        email: '',
        type: '',
        phoneNumber: '',
        textArea: '',
      });

      formRef.current?.focus();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setErrorMsg(
        error.name === 'AbortError'
          ? 'Request took too long. Please try again.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="submitted">
        <p tabIndex={-1} ref={formRef}>
          Thank you for contacting me.
        </p>
        <span>I will get back to you soon.</span>
      </section>
    );
  }

  return (
    <section className="contactContainer">
      <div className="contactHero">
        <span className="contactEyebrow">Let’s connect</span>
        <h1 data-aos="fade-right">Leave a message</h1>
        <p>
          Have a project, opportunity, collaboration, or professional enquiry?
          Send me a message and I will respond as soon as possible.
        </p>
      </div>

      <div data-aos="flip-up" className="formContainer">
        <form onSubmit={handleSubmit} aria-label="Contact form">
          <div className="input-style">
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={contactInfo.name}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={contactInfo.email}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="type">Contact Type</label>
              <select
                id="type"
                name="type"
                onChange={handleChange}
                value={contactInfo.type}
                required
              >
                <option value="" disabled>
                  Choose contact type
                </option>
                <option value="Friend">Friend</option>
                <option value="Employer">Employer</option>
                <option value="Client">Client</option>
                <option value="Collaboration">Collaboration</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                onChange={handleChange}
                value={contactInfo.phoneNumber}
                placeholder="Enter your phone number"
                required
                pattern="[0-9]+"
              />
            </div>

            <div className="formGroup fullWidth">
              <label htmlFor="textArea">Message</label>
              <textarea
                id="textArea"
                name="textArea"
                onChange={handleChange}
                value={contactInfo.textArea}
                placeholder="Write your message here..."
                required
              />
            </div>
          </div>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button className="btn-breath" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
