import React, { useState } from 'react'
import { db, collection, addDoc } from '../db'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css' 

const AddContact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const contactRef = collection(db, 'Contacts')
      await addDoc(contactRef, {
        firstName,
        lastName,
        email
      })
      alert('Contact added successfully!')
      navigate('/')  
    } catch (error) {
      console.error('Error adding contact:', error)
      alert('Failed to add contact')
    }
  }

  return (
    <div className="add-contact-container">
      <h2>Add New Contact</h2>
      <form className="add-contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter Last Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </div>
        <button className="submit-btn" type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default AddContact