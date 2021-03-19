import { combineReducers } from '@reduxjs/toolkit';
import charityModules from 'modules/charityModules';
import modalModules from 'modules/modalModules';
import donationModules from './modules/donationModules';

const rootReducer = combineReducers({
  donation: donationModules.reducer,
  charity: charityModules.reducer,
  modal: modalModules.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
