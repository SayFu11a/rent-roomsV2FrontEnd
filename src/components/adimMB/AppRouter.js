import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { privateRoutes2, publicRoutes } from '../../routes';
// import { Context } from '../index';

import { LOGIN_ROUTE, ADMIN_ROUTE } from '../adimMB/utils/consts';
// import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {
   // const { auth } = useContext(Context);
   // const [user] = useAuthState(auth);

   // console.log(user);

   const user = true;

   return user ? (
      <Routes>
         {privateRoutes2.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
         ))}
         <Route path="*" element={<Navigate to={ADMIN_ROUTE} replace />} />
      </Routes>
   ) : (
      <Routes>
         {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
         ))}
         <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
      </Routes>
   );
};

export default AppRouter;
