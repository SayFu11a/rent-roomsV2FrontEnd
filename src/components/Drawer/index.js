import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';
//===

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClickClose, onRemuve, cartItem = [], opened }) {
   const [orderId, setOrderId] = React.useState(null);
   const [isOrdered, setIsOrdered] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);

   const { priceSum, setCartItem } = useCart();

   console.log(opened);

   const onClickToOrderButt = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post('https://6589a9df324d41715259500c.mockapi.io/order', {
            items: cartItem,
         });
         setOrderId(data.id);
         setIsOrdered(true);
         setCartItem([]);

         for (let i = 0; i < cartItem.length; i++) {
            const item = cartItem[i];
            await axios.delete('https://63a826327989ad3286fb1b90.mockapi.io/cart/' + item.id);
            await delay(1000);
         }
      } catch (error) {
         alert('Не удалось выполнить заказ :(');
      }
      setIsLoading(false);
   };

   return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
         <div className={styles.drawer}>
            <h2 className="mb-30 d-flex justify-between">
               Корзина
               <img
                  onClick={onClickClose}
                  className="removeBtn cu-p"
                  src="https://sayfu11a.github.io/react_sneakers-deploy/img/btn-remove.svg"
                  alt="Close"
               />
            </h2>

            {cartItem.length > 0 ? (
               <div className="d-flex flex-column flex">
                  <div className="items">
                     {cartItem.map((obj) => (
                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                           <div
                              style={{ backgroundImage: `url(${obj.imgUrl})` }}
                              className="cartItemImg"></div>
                           <div className="mr-20 flex">
                              <p className="mp-5">{obj.title}</p>
                              <b>{obj.price} руб.</b>
                           </div>
                           <img
                              onClick={() => onRemuve(obj.id)}
                              className="removeBtn"
                              src="https://sayfu11a.github.io/react_sneakers-deploy/img/btn-remove.svg"
                              alt="Remove"
                           />
                        </div>
                     ))}
                  </div>
                  <div className="cartTotlaBlock">
                     <ul>
                        <li>
                           <span>Итого: </span>
                           <div></div>
                           <b>{priceSum} руб.</b>
                        </li>
                        <li>
                           <span>Налог 5%:</span>
                           <div></div>
                           <b>{Math.round(priceSum * 0.05)} руб.</b>
                        </li>
                     </ul>
                     {
                        // chenged----------------- 2:50:23
                     }
                     <button
                        disabled={isLoading}
                        onClick={onClickToOrderButt}
                        className="greenButton">
                        Оформить заказ
                        <img
                           src="https://sayfu11a.github.io/react_sneakers-deploy/img/arrow.svg"
                           alt="Arrow"
                        />
                     </button>
                  </div>
               </div>
            ) : (
               <Info
                  title={isOrdered ? 'Заказ оформлен!' : 'Корзина пустая'}
                  image={
                     isOrdered
                        ? 'https://sayfu11a.github.io/react_sneakers-deploy/img/ordered.jpg'
                        : 'https://sayfu11a.github.io/react_sneakers-deploy/img/empty-cart.jpg'
                  }
                  discription={
                     isOrdered
                        ? `Ваш заказ #${orderId} скоро будет обработан`
                        : 'Добавьте хотя бы одну комнату, чтобы сделать заказ.'
                  }
               />
            )}
         </div>
      </div>
   );
}

export default Drawer;

// [
//    {
//      "id": "1",
//      "price": 8499,
//      "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/01.jpg"
//    },
//    {
//      "id": "2",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/02.jpg",
//      "title": "Мужские Кроссовки Nike Air Max 270",
//      "price": 8499
//    },
//    {
//      "id": "3",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/03.jpg",
//      "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//      "price": 9499
//    },
//    {
//      "id": "4",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/04.jpg",
//      "title": "Кроссовки Puma X Aka Boku Future Rider",
//      "price": 10499
//    },
//    {
//      "id": "5",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/05.jpg",
//      "title": "Мужские Кроссовки Under Armour Curry 8",
//      "price": 9499
//    },
//    {
//      "id": "6",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/06.jpg",
//      "title": "Мужские Кроссовки Nike Kyrie 7",
//      "price": 9499
//    },
//    {
//      "id": "7",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/07.jpg",
//      "title": "Мужские Кроссовки Jordan Air Jordan 11",
//      "price": 9499
//    },
//    {
//      "id": "8",
//      "imgUrl": "https://sayfu11a.github.io/react_sneakers-deploy/img/sneakers/12.jpg",
//      "title": "Мужские Кроссовки Nike Kyrie Flytrap IV",
//      "price": 9499
//    }
//  ]
