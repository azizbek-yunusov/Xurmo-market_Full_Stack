import React from 'react'
import { Link } from 'react-router-dom'

const BrandItem = ({id, name, image}) => {
  return (
    <Link to={`/manufacturer/${name}`} className="p-2 m-1 bg-white border cursor-pointer border-gray-200 hover:shadow-md hover:border-white ease-in duration-200 lg:rounded-xl rounded-3xl items-center flex flex-col justify-between lg:p-3 px-9 py-4 lg:min-w-max min-w-[140px]">
      <img src={image.url} className="md:h-20 object-cover" alt={name} />
      <p className="normal-case text-xl text-gray-700 font-semibold md:mt-2">{name}</p>
    </Link>
  )
}

export default BrandItem