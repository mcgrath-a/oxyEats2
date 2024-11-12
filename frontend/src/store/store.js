import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './credentialsSlice';
import sidebarTabsReducer from './sidebarTabsSlice';
import menuReducer from "./menuSlice"

const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
    sideBarTabs: sidebarTabsReducer,
    menus: menuReducer
  },
});

export default store;
