import React from 'react'
import './Navbar.scss'
import Avator from '../../assets/avatar.svg'
import chevrondeown from '../../assets/chevron.svg'

function Navbar() {
  return (
    <div className="Navbar">
        <div className="logo">
            <h2>Premiernets</h2>
        </div>
        <div className="icons">
            <div className="avator">
            <img src={Avator} alt="" />
            </div>
            <div className="chevron">
            <img src={chevrondeown} alt="" />
        </div>
        </div>
    </div>
  )
}

export default Navbar