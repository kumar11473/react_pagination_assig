import { title } from 'process';
import React, { useState } from 'react';
import { ProductType } from './MainContainer';

import { FaCartArrowDown } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


interface ProductCardProps {
    favStatus:boolean,
    setFavStatus:React.Dispatch<React.SetStateAction<boolean>>,
    product:  ProductType
}

const Card: React.FC<ProductCardProps> = ({favStatus,setFavStatus,product}) => {
    

    const addToFav = ()=>{
      let localStorage :string | null = window.localStorage.getItem("fav")
      let favItemIds : string[] = []
      if(localStorage){
        favItemIds  = JSON.parse(localStorage)
      }
      
      console.log('id = ',product.id)
      const status:boolean = favItemIds.includes(product.id.toString());
      if(!status){
        favItemIds.push(product.id.toString())
        console.log('item added')
      }else{
        favItemIds=favItemIds.filter((id)=> parseInt(id)!==product.id)

      }
      window.localStorage.setItem('fav',JSON.stringify(favItemIds))
      setFavStatus(!status)
      
    }
  return (
   
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover rounded-t-lg bg-red-300" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-900 font-semibold mb-2">${product.price}</p>
        <p className="text-yellow-500 mb-2">Rating: {product.rating}</p>
        <p className="text-gray-700">Brand: {product.brand}</p>
      </div>
      <div  className="flex justify-center text-lg ">
        <span onClick={addToFav} className='fav-icon cursor-pointer'>
      {
        window.localStorage.getItem('fav')?.includes(product.id.toString())? <FaHeart  style={{color: 'red'}} />: <FaRegHeart />
      }
      </span>
      </div>
    </div>
  );
};

export default Card;

