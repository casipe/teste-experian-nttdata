import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app.reducer';
import ruralProducerReducer from './ruralProducer.reducer';

export type RootState = ReturnType<typeof store.getState>
export const store = configureStore({
  reducer: {
    app: appReducer,
    ruralProducer: ruralProducerReducer,
  }
});