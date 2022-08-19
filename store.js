import { configureStore } from '@reduxjs/toolkit';

import authReducer from './redux/chat';

const store = configureStore({
  reducer: {
    chats: authReducer,
  },
});

export default store;
