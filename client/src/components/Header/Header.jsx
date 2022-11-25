import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="md:my-3">
      <div className="container-full md:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className='text-red-600 md:text-4xl font-bold'>olcha</Link>
        </div>
      </div>
    </div>
  )
}

export default Header