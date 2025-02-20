import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ContactDetail = ({ contacts }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const contact = contacts.find(contact => contact.id === id)

  if (!contact) {
    return <p>Contact not found.</p>
  }

  return (
    <div className="contact-detail">
      <h1>{contact.firstName} {contact.lastName}</h1>
      <p>Email: {contact.email}</p>

      <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">
        Edit Contact
      </button>

      <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
    </div>
  )
}

export default ContactDetail