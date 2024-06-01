import React from 'react';
import Card from './Card';
import data from '../data.json';

export type ProductType =  typeof data.products[0]


const MainContainer: React.FC = () => {
 
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {data.products.map((product) => (
          
           <Card key={product.id} product={product}/>   
           // The key prop is special in React; it doesn't get passed down to the child component as a prop but is used internally by React for tracking elements.
        ))} 
      </div>
    </div>
  );
};

export default MainContainer;


/*

<Card key={product.id} product={
          {product.images[0],
            product.title,
            product.description,
            product.rating,
            product.brand,
            product.price}}
           />
       


*/