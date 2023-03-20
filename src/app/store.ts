import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import showAndHideMenuReducer from '../features/menu/showAndHideMenu.slice'
import navButtonsReducer from '../features/navButton/navButtons.slice' 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: showAndHideMenuReducer,
    navButtons: navButtonsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
