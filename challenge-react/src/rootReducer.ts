import { combineReducers } from '@reduxjs/toolkit';
import donationModules from './modules/donationModules';

const rootReducer = combineReducers({
  donation: donationModules.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
