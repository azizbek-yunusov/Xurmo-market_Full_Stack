import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import BannerItem from './BannerItem'
// import img from "../assets/img/1.jpg"
const responsive = {
  all: {
    breakpoint: { max: 2560, min: 320 },
    items: 1
  },
}
const BannerCarousel = () => {


  return (
    <div className="container-full grid grid-cols-12">
      {/* <Carousel
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite
        // customLeftArrow={customLeftArrow}
        // customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass=''

      >
        
        
      </Carousel> */}
      <div className="col-span-9">

          <BannerItem />
      </div>
      <div className="col-span-3"></div>
    </div>
  )
}

export default BannerCarousel