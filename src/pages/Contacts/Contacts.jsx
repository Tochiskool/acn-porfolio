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

const contactTypes = [
  'Friend',
  'Employer',
  'Employee',
  'Client',
  'Collaboration',
];

const normalizePhone = (value) =>
  value
    .trim()
    .replace(/[\s().-]/g, '')
    .replace(/^00/, '+');

// Checks international format, not whether the number exists.
const phonePattern = /^\+[1-9][0-9]{6,14}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({ ...emptyForm });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const formRef = useRef(null);
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

    const timer = setTimeout(() => navigate('/'), 3000);

    return () => clearTimeout(timer);
  }, [submitted, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactInfo((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setErrorMsg('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const payload = {
      name: contactInfo.name.trim(),
      email: contactInfo.email.trim(),
      type: contactInfo.type,
      phoneNumber: normalizePhone(contactInfo.phoneNumber),
      textArea: contactInfo.textArea.trim(),
    };

    const errors = {};

    if (!payload.name) {
      errors.name = 'Please enter your name.';
    }

    if (!emailPattern.test(payload.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!contactTypes.includes(payload.type)) {
      errors.type = 'Please choose a contact type.';
    }

    if (!phonePattern.test(payload.phoneNumber)) {
      errors.phoneNumber =
        'Include your country code, for example +393299856890.';
    }

    if (!payload.textArea) {
      errors.textArea = 'Please enter your message.';
    }

    setFieldErrors(errors);
    setErrorMsg('');

    if (Object.keys(errors).length > 0) {
      formRef.current?.elements.namedItem(Object.keys(errors)[0])?.focus();
      return;
    }

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

    const controller = new AbortController();
    requestRef.current = controller;

    let timedOut = false;

    const slowTimer = setTimeout(() => {
      setIsTakingLong(true);
    }, 5000);

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
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        let message = 'Unable to send your message. Please try again later.';

        if (response.status === 400) {
          const data = await response.json().catch(() => null);
          message =
            data?.message || 'Please check your contact details and try again.';
        }

        setErrorMsg(message);
        return;
      }

      setContactInfo({ ...emptyForm });
      setSubmitted(true);
    } catch (error) {
      if (error.name === 'AbortError' && !timedOut) return;

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

  const errorProps = (name) => ({
    'aria-invalid': Boolean(fieldErrors[name]),
    'aria-describedby': fieldErrors[name] ? `${name}-error` : undefined,
    style: fieldErrors[name] ? { borderColor: '#b91c1c' } : undefined,
  });

  const renderError = (name) =>
    fieldErrors[name] ? (
      <p
        id={`${name}-error`}
        role="alert"
        style={{ color: '#b91c1c', fontSize: '0.9rem' }}
      >
        {fieldErrors[name]}
      </p>
    ) : null;

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
          ref={formRef}
          onSubmit={handleSubmit}
          aria-label="Contact form"
          aria-busy={isSubmitting}
          noValidate
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
                {...errorProps('name')}
              />
              {renderError('name')}
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
                {...errorProps('email')}
              />
              {renderError('email')}
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
                {...errorProps('type')}
              >
                <option value="" disabled>
                  Choose contact type
                </option>
                {contactTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {renderError('type')}
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
                placeholder="+39 329 985 6890"
                disabled={isSubmitting}
                required
                {...errorProps('phoneNumber')}
              />
              {renderError('phoneNumber')}
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
                {...errorProps('textArea')}
              />
              {renderError('textArea')}
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
