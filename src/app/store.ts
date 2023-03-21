import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import showAndHideMenuReducer from "../features/menu/showAndHideMenu.slice";
import navButtonsReducer from "../features/navButton/navButtons.slice";
import scrollYReducer from "../features/scrollPosition/scrollPosition.slice";
import heroDetailsReducer from "../features/heroDetails/heroDetails.slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/saga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: showAndHideMenuReducer,
    navButtons: navButtonsReducer,
    scrollPos: scrollYReducer,
    heroDetails: heroDetailsReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(saga),
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
