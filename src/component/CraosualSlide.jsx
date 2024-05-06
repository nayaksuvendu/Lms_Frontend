import React from 'react'

export default function CraosualSlide({image,title,description,slideNumber,totalSlide}) {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
        <div className="flex flex-cols items-center justify-center gap-4 px-[15%]">
            <img src={image} className=" w-20 rounded-full border-2 border-gray-400" />
            <p className="font-thin text-gray-200">
            {description}
            </p>
           <h3 className=" text-nowrap font-semibold">{title}</h3>

           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
           <a href={`#slide${((slideNumber == 1) ? totalSlide : (slideNumber - 1))}`} className="btn btn-circle">❮</a> 
           <a href={`#slide${((slideNumber == totalSlide) ? 1 : (slideNumber + 1))}`} className="btn btn-circle">❯</a>
           </div>

         </div> 
     </div>
  )
}
