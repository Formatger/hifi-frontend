import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  navSidebarOpen: boolean;
}

const initialState: UIState = {
  navSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNavSidebar: (state) => {
      state.navSidebarOpen = !state.navSidebarOpen;
    },
    setNavSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.navSidebarOpen = action.payload;
    },
  },
});

export const { toggleNavSidebar, setNavSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
