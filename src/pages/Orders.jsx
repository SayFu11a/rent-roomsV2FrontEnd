import React from 'react';
import axios from 'axios';

import AppContext from '../context';
import Card from '../components/Card';

function Orders() {
   const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
   const [isLoading, setIsLoading] = React.useState(true);
   const [orders, setOrders] = React.useState([]);

   React.useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await axios.get('https://6589a9df324d41715259500c.mockapi.io/order');
            if (data && data.length > 0) {
               setOrders(data.map((obj) => obj.items).flat());
               setIsLoading(false);
            } else {
               setIsLoading(false);
            }
         } catch (err) {
            alert('Ошибка при загрузке заказов');
            console.error(err);
            setIsLoading(false);
         }
      };

      fetchData(); // Вызываем функцию fetchData при монтировании компонента
   }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании компонента

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мои покупки</h1>
         </div>

         <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
               <Card key={index} loading={isLoading} {...item} />
            ))}
         </div>
      </div>
   );
}

export default Orders;
