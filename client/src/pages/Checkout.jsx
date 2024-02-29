import React from 'react'
import { Link } from 'react-router-dom'
import success from '../images/7518748.png'

function Checkout() {
  return (
    <>
      <div className='checkout'>
        <span className='icon'>
          <img src={success} />
        </span>
        <span className='text-large'>Payment Done</span>
        <span className='text-secondary'>Thank you for completing your secure online payment</span>
        <span className='text-small'>Have a great day</span>
        <Link to={'/'}>
          <button className='home'>Go Home</button>
        </Link>
      </div>
      
    </>
    
  )
}

export default Checkout