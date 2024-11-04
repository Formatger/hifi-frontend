// apiKeySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiKeyState {
  hasApiKeys: boolean;
}

const initialState: ApiKeyState = {
  hasApiKeys: false,
};

const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    setHasApiKeys: (state, action: PayloadAction<boolean>) => {
      state.hasApiKeys = action.payload;
    },
  },
});

export const { setHasApiKeys } = apiKeySlice.actions;
export default apiKeySlice.reducer;
