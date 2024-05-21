import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCard from '../components/VerticalCard'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>

      <VerticalCard category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCard category={"Mouse"} heading={"Mouse"}/>
      <VerticalCard category={"televisions"} heading={"Televisions"}/>
      <VerticalCard category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCard category={"printers"} heading={"Printers"}/>
      <VerticalCard category={"speakers"} heading={"Bluetooth Speaker"}/>
      <VerticalCard category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCard category={"regrigerator"} heading={"Refrigerator"}/>
      <VerticalCard category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home

