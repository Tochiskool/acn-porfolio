import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    type: "",
    phoneNumber: "",
    textArea: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  // const [contacts, setContacts] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/getContacts")
  //     .then((contacts) => {
  //       console.log(contacts);
  //       setContacts(contacts.data);
  //     })
  //     .catch((error) => console.error("Failed to get contacts:", error));
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://portfolio2025-1-6fs4.onrender.com/createContacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      const result = await response.json();
      console.log("Success:", result.message);
      // alert(`Thank you, ${contactInfo.name}!`);

      setSubmitted(true); // hide form & show thanks message

      // Clear form after successful submission
      setContactInfo({
        name: "",
        email: "",
        type: "",
        phoneNumber: "",
        textArea: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setTimeout(() => {
      navigate("/"); // programmatic redirect
    }, 3000);
  };
  if (submitted) {
    return (
      <div className='submitted'>
        <p>Thank you for contacting me! I will get back to you soon. </p>
      </div>
    );
  }
  return (
    <div className='contactContainer'>
      <h1>Leave a message</h1>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <div className='input-style'>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              placeholder='Enter a name'
              value={contactInfo.name}
              required
            />

            <input
              type='email'
              name='email'
              onChange={handleChange}
              placeholder='Enter a valid email'
              value={contactInfo.email}
              required
            />

            <select
              name='type'
              onChange={handleChange}
              value={contactInfo.type}
              required
            >
              <option value='' disabled>
                Choose type
              </option>
              <option value='Friend'>Friend</option>
              <option value='Employer'>Employer</option>
            </select>

            <input
              type='number'
              name='phoneNumber'
              onChange={handleChange}
              placeholder='Enter a number'
              value={contactInfo.phoneNumber}
              required
            />

            <textarea
              className='textarea-style'
              type='text'
              name='textArea'
              onChange={handleChange}
              placeholder='Leave a message'
              value={contactInfo.textArea}
              required
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
