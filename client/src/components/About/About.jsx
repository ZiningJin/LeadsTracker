import React from 'react'
import './about.css'
import ARCHI from '../../assets/architecture.png'

const About = () => {
  return (
    <section id='about'>
          <div className="container about__container">
            <h1>E-Commerce EmailMQL Tracker Toolbox</h1>
            <a href="mailto:Anonymous" className="text-light">Developed by Charlie Jin</a>
            <br />
            <p>Data Source: Anonymous</p>
            <p>Insert Module: insert records</p>
            <p>Track Module: select criteria to view emailmqls and then decide whether to track</p>
            <p>Update Module: select the ID and input the updated status / feedback / oppty_number / amount_cny</p>
            <br />
            <div className='img-architecture'>
              <img src={ARCHI} alt="architecture" />
            </div>
            <div className="separator"></div>
        </div>
    </section>
  )
}

export default About
