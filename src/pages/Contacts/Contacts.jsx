import React, { useState } from "react";
import "./contact.css";
const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    type: "",
    phoneNumber: "",
    textArea: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactInfo); //console log every data in the logInfo varaible
    setContactInfo({
      name: "",
      email: "",
      type: "",
      phoneNumber: "",
      textArea: "",
    });
  };

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
