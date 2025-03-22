import React from 'react'
import Stage1 from '../components/checkOut/Stage1';
import Stage2 from '../components/checkOut/Stage2';
import Stage3 from '../components/checkOut/Stage3';

const CheckOut = () => {
  return (
    <>
      <div className="md:max-w-[70%] md:mx-auto flex flex-col gap-2">
        <Stage1 />
        <Stage2 />
        <Stage3 />
      </div>
    </>
  )
}

export default CheckOut
