import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Jane Doe',
  email: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser, loggedIn } = userSlice.actions;
export default userSlice.reducer;