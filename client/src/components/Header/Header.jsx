import React from 'react'
import './header.css'
import {links} from '../../data'
import LOGO from '../../assets/img.png'

const Header= () => {
  return (
    <div className="banner">
        <div className="logo">
            <img src={LOGO} alt="IR-LOGO" />
        </div>
        <ul className='banner__links'>
          {
            links.map(({name, path}, index) => {
              return (
                <a href={path}>{name}</a>
              )
            })
          }
        </ul>
    </div>
  )
}
export default Header
