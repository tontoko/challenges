import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  donate: number;
};

const initialState: State = {
  donate: 0,
};

const donationModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    updateTotalDonate(state: State, action: PayloadAction<number>) {
      state.donate = state.donate + action.payload;
    },
  },
});

export const { updateTotalDonate } = donationModules.actions;

export default donationModules;
