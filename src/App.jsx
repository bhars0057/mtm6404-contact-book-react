import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { db, collection, getDocs } from './db'
import Home from './components/Home'
import ContactDetail from './components/ContactDetails' // New component
import AddContact from './components/AddContact'
import EditContact from './components/EditContact'
import './styles/global.css'
import './App.css'

const App = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Contacts'))
        if (querySnapshot.empty) {
          console.log('No contacts found in Firestore.')
        } else {
          const contactsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          contactsList.sort((a, b) => a.lastName.localeCompare(b.lastName))
          console.log('Fetched contacts:', contactsList)
          setContacts(contactsList)
        }
      } catch (error) {
        console.error('Error fetching contacts: ', error)
      }
    }

    fetchContacts()
  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home contacts={contacts} setContacts={setContacts} />} />
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
          <Route path="/add-contact" element={<AddContact setContacts={setContacts} />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App