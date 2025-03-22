import React, { useEffect, useState } from 'react'
import { categoryApi } from '../common/apiData'
import CategoriesCart from '../components/CategoriesCart'
import PanelProduct from '../components/PanelProduct'
import SingleCategoryCart from '../components/SingleCategoryCart'
import HorizontalCart from '../components/HorizontalCart'

const Home = () => {
  return (
    <div className=''>
      
      <CategoriesCart/>
      <PanelProduct/>
      <SingleCategoryCart category={"mobiles"} heading={"Tops Mobiles"} />
      <HorizontalCart category={"televisions"} heading={"Tops Televesion"} />
      <SingleCategoryCart category={"watches"} heading={"Tops Watches"} />
      <SingleCategoryCart category={"speakers"} heading={"Tops Speakers"} />
      
      


      <HorizontalCart category={"refrigerator"} heading={"Refrigerator"} />
      
      <HorizontalCart category={"mobiles"} heading={"Mobiles"} />
      <HorizontalCart category={"camera"} heading={"Camera"} />
      <HorizontalCart category={"filters"} heading={"Tops RO +UV"} />
    </div>
  )
}

export default Home
