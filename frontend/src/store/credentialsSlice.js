import { createSlice } from '@reduxjs/toolkit';

const loadCredentialsFromLocalStorage = () => {
  const savedCredentials = localStorage.getItem('credentials');
  return savedCredentials ? JSON.parse(savedCredentials) : null;
};

const initialState = {
  credentials: loadCredentialsFromLocalStorage(), 
};

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
     
      const { email, role, _id, fullName, newsEmail } = action.payload;
      state.credentials = { email, role, _id, fullName, newsEmail };
      localStorage.setItem(
        'credentials',
        JSON.stringify({ email, role, _id, fullName, newsEmail })
      );
    
    },

    clearCredentials: (state) => {
      state.credentials = null;
      localStorage.removeItem('credentials');
    },
  },
});

export const { setCredentials, clearCredentials } = credentialsSlice.actions;

export default credentialsSlice.reducer;
