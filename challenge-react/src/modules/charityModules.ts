import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharities } from 'helpers';
import { Charity } from 'types/charity';

type State = {
  charities: Charity[];
  loading: boolean;
};

const initialState: State = {
  charities: [],
  loading: true,
};

export const getCharities = createAsyncThunk(
  'donation',
  async (_args, _thunkApi) => {
    const charities = await fetchCharities();
    return charities;
  }
);

const charityModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharities.fulfilled, (state, action) => {
      state.charities = action.payload;
      state.loading = false;
    });
    builder.addCase(getCharities.rejected, (state, _action) => {
      state.loading = false;
    });
    builder.addCase(getCharities.pending, (state, _action) => {
      state.loading = true;
    });
  },
});

export default charityModules;
