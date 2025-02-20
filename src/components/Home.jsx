import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db, doc, deleteDoc } from '../db'

const Home = ({ contacts, setContacts }) => {  // Accept setContacts as a prop
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = contacts.filter(contact => 
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Contacts', id))
      alert('Contact deleted successfully!')
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id)) // Update state
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('Failed to delete contact')
    }
  }

  return (
    <div className="container">
      <h1>Contact List</h1>
      
      <input 
        type="text" 
        placeholder="Search contacts by name..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-bar"
      />

      <Link to="/add-contact" className="add-btn">Add New Contact</Link>

      {filteredContacts.length > 0 ? (
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <Link to={`/contact/${contact.id}`} className="contact-name">
                {contact.firstName} {contact.lastName}
              </Link>
              <p>{contact.email}</p>
              
              <div className="button-group">
                <Link to={`/edit/${contact.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button onClick={() => handleDelete(contact.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  )
}

export default Home