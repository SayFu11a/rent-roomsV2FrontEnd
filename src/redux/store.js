import { configureStore } from '@reduxjs/toolkit';
import { postsReduser } from './slices/post';
import { authReducer } from './slices/auth';

const store = configureStore({
   reducer: {
      posts: postsReduser,
      auth: authReducer,
   },
});

export default store;
