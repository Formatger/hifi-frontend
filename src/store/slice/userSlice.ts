// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

interface User {
  email: string;
  password: string;
  userID: string;
  secret: string;
  qr_code: string | any;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Add more reducer actions here if needed
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
