import React, { memo, useEffect, useState } from 'react';
import Card from './Card';
import data from '../data.json';

export type ProductType =  typeof data.products[0]

interface PropType {
  favStatus:boolean,
  setFavStatus:React.Dispatch<React.SetStateAction<boolean>>,
  CACHE:any,
  currentPage:number
  offset:number,
  totalPages:number
}
const MainContainer: React.FC<PropType> = ({favStatus, setFavStatus,CACHE,currentPage,offset ,totalPages}) => {
  
console.log('Maincontainer renders')
let [Data,setData] =useState<Array<ProductType>>([])
// let Data :ProductType[] = []
let index:number =0 


const fetchData = async () =>{
let temp :ProductType[] = []

    for(let i:number =(currentPage-1)*offset;i<(currentPage*offset);i+=5){
      
      try {
        
        if(CACHE[i]){
          // const temp =  CACHE[i]
          console.log('cached data return ')
          // console.log(CACHE[i])
          for(const obj of CACHE[i]){
            // Data.push(obj);
            temp[obj.id]=obj
            
          }
        }else{
          const response = await fetch(`https://dummyjson.com/products?limit=5&skip=${i}`)
          const data = await response.json()
          CACHE[i]=data.products
         
          console.log('fresh data returned')
          for(const obj of data.products){
            // Data.push(obj);
            temp[obj.id]=obj
            
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    setData(temp)
  }  
  

  useEffect( ()=>{
  
  console.log("first")
    fetchData()    

  },[offset,currentPage])

   console.log('Data= ')
  console.log(Data)

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {Data.map((product) => (
           <Card favStatus={favStatus} setFavStatus={setFavStatus} key={product.id} product={product} />   
           // The key prop is special in React; it doesn't get passed down to the child component as a prop but is used internally by React for tracking elements.
        ))} 
      </div>
    </div>
  );
};

export default memo(MainContainer);























// import React, { useEffect, useState } from 'react';
// import Card from './Card';
// import data from '../data.json';

// export type ProductType = typeof data.products[0];

// interface PropType {
//   CACHE: any;
//   currentPage: number;
//   offset: number;
//   totalPages: number;
// }

// const MainContainer: React.FC<PropType> = ({ CACHE, currentPage, offset, totalPages }) => {
//   console.log('Maincontainer renders');
//   const [Data, setData] = useState<ProductType[]>([]);

//   const fetchData = async () => {
//     const newData: ProductType[] = [];

//     for (let i = (currentPage - 1) * offset; i < currentPage * offset; i += 5) {
//       try {
//         if (CACHE[i]) {
//           console.log('Cached data returned');
//           // console.log(CACHE[i])
//           // newData[i]=CACHE[i]
//           newData.push(...CACHE[i]);
//         } else {
//           const response = await fetch(`https://dummyjson.com/products?limit=5&skip=${i}`);
//           const data = await response.json();
//           CACHE[i] = data.products;
//           console.log('Fresh data returned');
//           // console.log(data.products)
//           newData.push(...data.products);
//           // newData[i]=data.products
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     console.log('inside fetch')

//     // for(const obj in newData){
//     //   for(const dat of newData[obj]){
        
//     //   }
//     // }
//     // setData(newData);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [ currentPage, offset]);

//   console.log('Data: ', Data);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {Data.map((product) => (
//           <Card key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainContainer;
