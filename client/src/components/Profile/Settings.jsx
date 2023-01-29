import React from 'react'
import { Link } from 'react-router-dom'
import LayoutP from './LayoutP'

const Settings = () => {
  return (
    <LayoutP>
      <div className="grid grid-cols-2 gap-8 mt-5 md:px-32">
        <div className="col-span-1 rounded-lg shadow-xl bg-purple-500 h-32">
          <Link to={"/myprofile/update"} className="text-xl w-full h-full flex_center text-gray-50">
            Edit
          </Link>
        </div>
        <div className="col-span-1 rounded-lg shadow-xl bg-purple-500 h-32">v</div>
        <div className="col-span-1 rounded-lg shadow-xl bg-purple-500 h-32">a</div>
        <div className="col-span-1 rounded-lg shadow-xl bg-purple-500 h-32">a</div>
      </div>
    </LayoutP>
  )
}

export default Settings