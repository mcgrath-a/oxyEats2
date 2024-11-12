import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 0, 
};

const sideBarTabsSlice = createSlice({
  name: 'sideBarTabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
     
      const { tab } = action.payload;
      state.currentTab = tab
    
    },

  },
});

export const { setCurrentTab } = sideBarTabsSlice.actions;

export default sideBarTabsSlice.reducer;
