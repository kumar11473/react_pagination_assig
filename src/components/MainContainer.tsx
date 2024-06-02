import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import data from '../data.json';

export type ProductType =  typeof data.products[0]

interface PropType {
  Data:ProductType[],
  setData:React.Dispatch<React.SetStateAction<ProductType[]>>,
  favStatus:boolean,
  setFavStatus:React.Dispatch<React.SetStateAction<boolean>>,
  CACHE:any,
  currentPage:number
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>
  offset:number,
  totalPages:number
}
const MainContainer: React.FC<PropType> = ({Data,setData,favStatus, setFavStatus,CACHE,currentPage,setCurrentPage,offset ,totalPages}) => {
  
    const [loading,setLoading]=useState<boolean>(false)
  
    // const [isAtBottom, setIsAtBottom] = useState(false);

     
    const fetchData = async (page: number) => {
      setLoading(true);
      let temp: ProductType[] = [];
  
      for (let i: number = (page - 1) * offset; i < page * offset; i += 5) {
        try {
          if (CACHE[i]) {
            console.log('cached data return');
            for (const obj of CACHE[i]) {
              temp[obj.id] = obj;
            }
          } else {
            const response = await fetch(`https://dummyjson.com/products?limit=5&skip=${i}`);
            const data = await response.json();
            CACHE[i] = data.products;
  
            console.log('fresh data returned');
            for (const obj of data.products) {
              temp[obj.id] = obj;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      setData(temp);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData(currentPage);
    }, [currentPage,offset]);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && !loading) {
          setCurrentPage((prevPage) => prevPage + 1);
          window.scrollTo(0,0)
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [loading]);
  
    return (
      <div className="main-container container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Data.map((product) => (
            <Card favStatus={favStatus} setFavStatus={setFavStatus} key={product.id} product={product} />
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </div>
    );
  };
  
  export default MainContainer;


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
