import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const emptyForm = {
  name: '',
  email: '',
  type: '',
  phoneNumber: '',
  textArea: '',
};

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({ ...emptyForm });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const successRef = useRef(null);
  const requestRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!submitted) return;

    successRef.current?.focus();

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [submitted, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const apiUrl = import.meta.env.VITE_API_URL?.trim();

    if (!apiUrl) {
      setErrorMsg(
        'The contact service is unavailable. Please try again later.'
      );
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setIsTakingLong(false);
    setErrorMsg('');

    const controller = new AbortController();
    requestRef.current = controller;

    let timedOut = false;

    const slowTimer = setTimeout(() => {
      setIsTakingLong(true);
    }, 5000);

    // Allows extra time if the server needs to start.
    const timeoutTimer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 60000);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/+$/, '')}/createContacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactInfo),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Contact request failed: ${response.status}`);
      }

      // A successful response does not need a JSON body.
      setContactInfo({ ...emptyForm });
      setSubmitted(true);
    } catch (error) {
      if (error.name === 'AbortError' && !timedOut) {
        return;
      }

      console.error('Contact submission error:', error);

      setErrorMsg(
        timedOut
          ? 'The server took too long to confirm your message. It may still have been received. Please wait before trying again.'
          : 'We could not confirm your submission. Please check your connection and try again later.'
      );
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(timeoutTimer);

      requestRef.current = null;
      submittingRef.current = false;

      if (!controller.signal.aborted || timedOut) {
        setIsSubmitting(false);
        setIsTakingLong(false);
      }
    }
  };

  if (submitted) {
    return (
      <section className="submitted" aria-labelledby="contact-success">
        <p id="contact-success" tabIndex={-1} ref={successRef}>
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
        <form
          onSubmit={handleSubmit}
          aria-label="Contact form"
          aria-busy={isSubmitting}
        >
          <div className="input-style">
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                value={contactInfo.name}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={contactInfo.email}
                placeholder="Enter your email address"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                autoComplete="tel"
                onChange={handleChange}
                value={contactInfo.phoneNumber}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
                required
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
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {errorMsg && (
            <p className="error-message" role="alert">
              {errorMsg}
            </p>
          )}

          {isTakingLong && (
            <p role="status" style={{ marginTop: '1rem', textAlign: 'center' }}>
              Sending is taking longer than usual. Please keep this page open.
            </p>
          )}

          <button className="btn-breath" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending your message…' : 'Submit Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
