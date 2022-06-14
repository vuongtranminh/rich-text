import React from 'react'
import Footer from './Footer'
import Header from './Header.js'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header />
        <div className="container">
            <div className="content">{ children }</div>
        </div>
        <Footer />
    </div>
  )
}

export default DefaultLayout