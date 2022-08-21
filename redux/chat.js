import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'chats',
  initialState: {
    status: '',
    chats: [],
    groupname: '',
    created_at: '',
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
      state.groupname = action.payload.groupname;
      state.status = action.payload.status;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats } = authSlice.actions;

export default authSlice.reducer;
