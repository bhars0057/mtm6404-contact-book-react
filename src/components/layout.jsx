import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'

const Layout = ({ children }) => {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Contact Book</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Contact</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout