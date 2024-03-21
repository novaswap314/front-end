import { configureStore } from '@reduxjs/toolkit'
import userSlice from './module/user.js';
import globalSlice from './module/global.js';

export default configureStore({
  reducer: {
    user: userSlice,
    global: globalSlice,
  },
})