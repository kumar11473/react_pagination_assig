import React, { useEffect, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductType } from './MainContainer';
import Card from './Card';

interface PropType {
  favStatus: boolean;
  setFavStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<PropType> = ({ favStatus, setFavStatus }) => {


  const [Data, setData] = useState<Array<ProductType>>([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const loadData = async (id: number): Promise<ProductType> => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  };

  const fetchFavoriteItems = useCallback(async () => {
    let localStorage: string | null = window.localStorage.getItem("fav");
    let favItemIds: string[] = [];
    if (localStorage) {
      favItemIds = JSON.parse(localStorage);
    }

    let data: ProductType[] = [];
    for (let i = 0; i < favItemIds.length; i++) {
      const response = await loadData(parseInt(favItemIds[i]));
      data.push(response);
    }

    setData(data);
  }, [localStorage]);

  useEffect(() => {
    fetchFavoriteItems();
  }, [favStatus]);

  const totalValue = Data.reduce((total, item) => total + item.price, 0);


  console.log(Data);
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Your Cart Items</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

      {Data.map((product) => (
        <Card
        favStatus={favStatus}
        setFavStatus={setFavStatus}
        key={product.id}
        product={product}
        
        />
      ))}
      </div>

      <div className="flex justify-between mt-4 pt-4 border-t">
        <span className="font-bold">Total Value:</span>
        <span className="font-bold">${totalValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;

