import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  donate: number;
  message: string;
} | null;

const initialState: State = {
  donate: 0,
  message: '',
};

const donationModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    updateTotalDonate(state: State, action: PayloadAction<number>) {
      state.donate = state.donate + action.payload;
    },
    updateMessage(state: State, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
});

export const { updateTotalDonate, updateMessage } = donationModules.actions;

export default donationModules;
