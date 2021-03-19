import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDonate, summaryDonations } from 'helpers';

type State = {
  donate: number;
};

const initialState: State = {
  donate: 0,
};

export const updateTotalDonate = createAsyncThunk(
  'updateTotalDonate',
  async (_args, _thunkApi) => {
    const data = await fetchDonate();
    const donate = summaryDonations(data.map((item) => item.amount));
    return donate;
  }
);

const donationModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTotalDonate.fulfilled, (state, action) => {
      state.donate = action.payload;
    });
  },
});

export default donationModules;
