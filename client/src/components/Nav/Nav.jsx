import React from 'react'
import './nav.css'
import { useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {BsPen} from 'react-icons/bs'
import {GrUpdate} from 'react-icons/gr'
import {VscChecklist} from 'react-icons/vsc'
import {BsCloudDownload} from 'react-icons/bs'

const Nav = () => {
    const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
        <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><AiOutlineHome /></a>
        <a href="#insert" onClick={() => setActiveNav('#insert')} className={activeNav === '#insert' ? 'insert': ''}><BsPen /></a>
        <a href="#track" onClick={() => setActiveNav('#track')} className={activeNav === '#track' ? 'active' : ''}><VscChecklist /></a>
        <a href="#update" onClick={() => setActiveNav('#update')} className={activeNav === '#update' ? 'active' : ''}><GrUpdate /></a>
        <a href="#download" onClick={() => setActiveNav('#download')} className={activeNav === '#download' ? 'active' : ''}><BsCloudDownload /></a>
    </nav>
  )
}

export default Nav
