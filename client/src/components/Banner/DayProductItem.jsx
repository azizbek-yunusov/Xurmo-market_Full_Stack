import React from 'react'

const DayProductItem = ({name, image, price}) => {
  return (
    <div className="border-4 border-red-600 overflow-hidden p-2 rounded-xl h-[350px]">
      <img src={image} alt="" />
      <p className="">{name}</p>
      <p className="">{price}</p>
    </div>
  )
}

export default DayProductItem