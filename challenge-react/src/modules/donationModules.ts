import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDonate, fetchDonate, summaryDonations } from 'helpers';
import { Payment } from 'types/payment';

type State = {
  donate: number;
  procceccing: boolean;
};

const initialState: State = {
  donate: 0,
  procceccing: false,
};

export const updateTotalDonate = createAsyncThunk(
  'updateTotalDonate',
  async (_args, _thunkApi) => {
    const data = await fetchDonate();
    const donate = summaryDonations(data.map((item) => item.amount));
    return donate;
  }
);

export const addDonate = createAsyncThunk<
  number,
  { item: Omit<Payment, 'id'> }
>('addDonate', async ({ item }, _thunkApi) => {
  await createDonate(item);
  return item.amount;
});

const donationModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTotalDonate.fulfilled, (state, action) => {
      state.donate = action.payload;
      state.procceccing = false;
    });
    builder.addCase(updateTotalDonate.rejected, (state, _action) => {
      state.procceccing = false;
    });
    builder.addCase(updateTotalDonate.pending, (state, _action) => {
      state.procceccing = true;
    });
    builder.addCase(addDonate.fulfilled, (state, action) => {
      state.donate = state.donate + action.payload;
      state.procceccing = false;
    });
    builder.addCase(addDonate.rejected, (state, action) => {
      state.procceccing = false;
      throw action.error;
    });
    builder.addCase(addDonate.pending, (state, _action) => {
      state.procceccing = true;
    });
  },
});

export default donationModules;
