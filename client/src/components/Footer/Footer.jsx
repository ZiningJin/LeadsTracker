import React from 'react'
import './footer.css'
import CTA from './CTA'

const Footer = () => {
  return (
    <footer>
        <div className="container footer__container">
        <CTA />
        <br />
        <ul className='permalinks'>
            <li><a href="#about">About</a></li>
            <li><a href="#insert">Insert</a></li>
            <li><a href="#track">Track</a></li>
            <li><a href="#update">Update</a></li>
            <li><a href="#Download">Download</a></li>
        </ul>

        <div className='footer__copyright'>
            <small>Anonymous</small>
        </div>
        </div>
    </footer>
  )
}

export default Footer
