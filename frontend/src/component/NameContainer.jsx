import React from 'react'
import { FaGithub } from "react-icons/fa";

function NameContainer() {
  return (
    <>
    <div className="github absolute text-[40px] top-0 right-0 lg:mr-[2%] lg:mt-[2%] mr-[5%] mt-[5%]"><a href="https://github.com/S0URABH-choudhary">< FaGithub /></a></div>
    <div className='name absolute mb-36 max-md:top-[10%] md:top-[15%] text-blue-300'><h1 className='truncate max-md:m-0 m-[-81px] self-center text-[80px] font-extrabold'>Dropzy</h1></div> 
  </>
  )
};

export default NameContainer;