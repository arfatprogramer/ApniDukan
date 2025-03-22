import React, { useEffect, useState } from 'react'
import img1 from "../assets/banner/img1.webp";
import img2 from "../assets/banner/img2.webp";
import img3 from "../assets/banner/img3.jpg";
import img4 from "../assets/banner/img4.jpg";
import img5 from "../assets/banner/img5.webp";

import img1_mobile from "../assets/banner/img1_mobile.jpg";
import img2_mobile from "../assets/banner/img2_mobile.webp";
import img3_mobile from "../assets/banner/img3_mobile.jpg";
import img4_mobile from "../assets/banner/img4_mobile.jpg";
import img5_mobile from "../assets/banner/img5_mobile.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const PanelProduct = () => {
    
    const [slideImage, setSlideImage] = useState(0)
    const desktop = [img1, img2, img3, img4, img5]
    const mobile = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile]

   
    useEffect(()=>{
        const slideIntervale=setInterval(() => {           
            setSlideImage((slideImage + 1) % desktop.length)
        }, 4000);
        return () => clearInterval(slideIntervale);
    },[slideImage])
    return (
        <div className=" my-2 sm:px-2">
            <div className=' flex justify-center items-center h-40 md:h-64 sm:52 bg-slate-200 rounded-lg relative w-full'>
                <div className="flex justify-between items-center  absolute z-10 w-full max-sm:h-full ">
                    <button className='sm:bg-white sm:rounded-full p-1 text-2xl max-sm:h-full max-sm:w-1/2 max-sm:text-transparent' onClick={()=>setSlideImage((slideImage==0?desktop.length-1:slideImage -1)) }><FaAngleLeft /></button>
                    <button className='sm:bg-white sm:rounded-full p-1 text-2xl max-sm:h-full max-sm:w-1/2 max-sm:text-transparent' onClick={()=>setSlideImage((slideImage + 1) % desktop.length) }><FaAngleRight /></button>
                   
                </div>
                <div className=" flex w-full h-full overflow-hidden ">

                    {
                        desktop.map((item, index) => {
                            return (
                                <div key={index} className="min-w-full min-h-full transition-all" style={{ transform: `translateX(-${slideImage * 100}%)` }}>
                                    <img  src={item} alt="Mobile" className='object-cover h-full w-full' />
                                </div>
                            )
                        })

                    }
                </div>

            </div>
        </div>
    )
}

export default PanelProduct
