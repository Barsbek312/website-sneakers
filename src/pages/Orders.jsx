import Card from '../components/Card/index'; 
import React from "react";
import axios from 'axios';
import { AppContext } from '../App';

function Orders() {
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext )
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try{
        const { data } = await axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/orders'); 
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      }catch(error){
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    }
    fetchData()
  }, []) 
  return ( 
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {
        (isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card
            key={index}
            loading = {isLoading}
            {...item}
          />
        ))
        }
      </div>
    </div>
  );
}

export default Orders; 