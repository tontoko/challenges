import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  show: boolean;
  msg: string;
};

const initialState: State = {
  show: false,
  msg: '',
};

const modalModules = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    showModal(state: State, action: PayloadAction<string>) {
      state.show = true;
      state.msg = action.payload;
    },
    closeModal(state: State) {
      state.show = false;
    },
    showProcceccing(state: State) {
      state.show = true;
      state.msg = 'procceccing...';
    },
  },
});

export const { showModal, closeModal, showProcceccing } = modalModules.actions;

export default modalModules;
