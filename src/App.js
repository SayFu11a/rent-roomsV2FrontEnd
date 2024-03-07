import { Routes, Route, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import React, { Fragment } from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

//=========================

import axios from 'axios';
import BookingPage from './pages/BookingPage';
import GuestInfo from './pages/GuestInfo';
import ReservationPage from './pages/ReservationPage';

// import Header from './components/Header';
// import Drawer from './components/Drawer';
//import Home from './pages/Home';
//import Favorites from './pages/Favorites';
//import Orders from './pages/Orders';

//import AppContext from './context';
// ====

// import AppRouter from './components/adimMB/AppRouter';
// import Admin from './components/adimMB/Admin';
// import Login from './components/adimMB/Login';

function App() {
   const [items, setItems] = React.useState([]);
   const [cartItem, setCartItem] = React.useState([]);
   const [favorites, setFavorites] = React.useState([]);

   const [searchValue, setSearchValue] = React.useState('');
   const [isCartOpened, setIsCartOpened] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(true);

   // ==

   const dispatch = useDispatch();
   const isAuth = useSelector(selectIsAuth);

   // ================

   React.useEffect(() => {
      async function fetchData() {
         try {
            const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
               axios.get('https://63a826327989ad3286fb1b90.mockapi.io/items'),
               axios.get('https://63a826327989ad3286fb1b90.mockapi.io/cart'),
               axios.get('https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite'),
            ]);

            setIsLoading(false);

            setFavorites(favoritesResponse.data);
            setCartItem(cartResponse.data);
            setItems(itemsResponse.data);
         } catch (err) {
            alert('ошибка при получении данных ;(');
         }
      }
      dispatch(fetchAuthMe());

      fetchData();
   }, []);

   const onAddToCart = async (obj) => {
      try {
         const filtredItem = cartItem.find((item) => Number(item.parentId) == Number(obj.id));
         if (filtredItem) {
            setCartItem((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
            await axios.delete(
               `https://63a826327989ad3286fb1b90.mockapi.io/cart/${filtredItem.id}`,
            );
         } else {
            setCartItem((prev) => [...prev, obj]);
            const { data } = await axios.post(
               'https://63a826327989ad3286fb1b90.mockapi.io/cart',
               obj,
            );
            setCartItem((prev) =>
               prev.map((item) => {
                  if (item.parentId === data.parentId) {
                     return {
                        ...item,
                        id: data.id,
                     };
                  }
                  return item;
               }),
            );
         }
      } catch (err) {
         alert('неудалось добавить в корзину :(');
         console.error(err);
      }
   };

   const onAddToFavorite = async (obj) => {
      try {
         if (favorites.find((favObj) => favObj.id == obj.id)) {
            axios.delete(`https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite/${obj.id}`);
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
         } else {
            const { data } = await axios.post(
               'https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite',
               obj,
            );
            setFavorites((prev) => [...prev, data]);
         }
      } catch (err) {
         alert('Не удалось добавить в закладки');
         console.error(err);
      }
   };

   const onRemuveItem = (id) => {
      try {
         axios.delete(`https://63a826327989ad3286fb1b90.mockapi.io/cart/${id}`);
         setCartItem((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
         alert('неудалось удалить из корзины :(');
         console.error(err);
      }
   };

   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };

   const isAddedToCart = (id) => {
      return cartItem.some((obj) => +obj.parentId === +id);
   };

   const user = false;

   // ================

   return (
      <>
         <Header />
         <Container maxWidth="lg">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/posts/:id" element={<FullPost />} />
               <Route path="/posts/:id/edit" element={<AddPost />} />
               <Route path="/add-post" element={<AddPost />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Registration />} />
               <Route path="/booking" element={<BookingPage />} />
               <Route path="/guest-info" element={<GuestInfo />} />
               <Route path="/reservation" element={<ReservationPage />} />
            </Routes>
         </Container>
      </>
   );
}

export default App;
