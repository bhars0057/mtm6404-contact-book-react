import React, { useState, useEffect } from 'react'
import { db } from '../db'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/global.css' 

const EditContact = () => {
  const { id } = useParams()
  const [contact, setContact] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContact = async () => {
      console.log("Fetching contact with ID:", id)
      try {
        const docRef = doc(db, 'Contacts', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log("Contact Data:", data)
          setContact(data)
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setEmail(data.email)
        } else {
          console.log('No such contact!')
        }
      } catch (error) {
        console.error('Error fetching contact:', error)
      }
    }
    fetchContact()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Updating contact:', { firstName, lastName, email })
    const docRef = doc(db, 'Contacts', id)
    await updateDoc(docRef, { firstName, lastName, email })
    console.log(`Navigating to /contact/${id}`)
    navigate(`/contact/${id}`)
  }

  return contact ? (
    <form className="edit-contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>
      <button className="submit-btn" type="submit">Save</button>
    </form>
  ) : (
    <p>Contact not found or loading...</p>
  )
}

export default EditContact