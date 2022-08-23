import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
    groupname: '',
    created_at: '',
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
      state.groupname = action.payload.groupname;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats } = authSlice.actions;

export default authSlice.reducer;
