import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharities } from 'helpers';
import { Charity } from 'types/charity';

type State = {
  charities: Charity[];
};

const initialState: State = {
  charities: [],
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
    });
  },
});

export default charityModules;
