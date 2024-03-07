import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
   const dispatch = useDispatch();
   const isAuth = useSelector(selectIsAuth);

   const onClickLogout = () => {
      if (window.confirm('Вы уверены что хотите выйти?')) {
         dispatch(logout());
         window.localStorage.removeItem('token');
      }
   };

   return (
      <div className={styles.root}>
         <Container maxWidth="lg">
            <div className={styles.inner}>
               <Link className={styles.logo} to="/">
                  <img
                     width={80}
                     height={60}
                     src="https://raw.githubusercontent.com/SayFu11a/-/main/chrome_yD1kImMOnf.png"
                     alt="Logopng"
                  />
                  <div className={styles.title}>система для бронирования номеров в гостиницах</div>
               </Link>
               <div className={styles.buttons}>
                  {isAuth ? (
                     <>
                        <Link to="/reservation">
                           <Button variant="contained">Редактировать брони</Button>
                        </Link>
                        <Link to="/add-post">
                           <Button variant="contained">Добавить номер</Button>
                        </Link>
                        <Button onClick={onClickLogout} variant="contained" color="error">
                           Выйти
                        </Button>
                     </>
                  ) : (
                     <>
                        <Link to="/login">
                           <Button variant="outlined">Войти</Button>
                        </Link>
                        <Link to="/register">
                           <Button variant="contained">Создать аккаунт</Button>
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </Container>
      </div>
   );
};
