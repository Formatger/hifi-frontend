// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentTableState {
  paymentTable: Table | null;
}

interface Table {
  atx_id_charged: any;
  atx_id_credited: any;
  atx_status_charged: any;
  atx_status_credited: any;
  currency: string;
  description: string;
  email: string;
  purpose: string;
  quantity: any;
  rate: any;
  transfer_date: any;
  transfer_id: any;
  transfer_status_code: any;
  type: string;
  user_id: string;
}

const initialState: PaymentTableState = {
  paymentTable: null,
};

const paymentTableSlice = createSlice({
  name: "paymentTable",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Table | null>) => {
      state.paymentTable = action.payload;
    },
    // Add more reducer actions here if needed
  },
});

export const { setUser } = paymentTableSlice.actions;
export default paymentTableSlice.reducer;
