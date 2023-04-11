import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import showAndHideMenuReducer from "../features/menu/showAndHideMenu.slice";
import navButtonsReducer from "../features/navButton/navButtons.slice";
import scrollYReducer from "../features/scrollPosition/scrollPosition.slice";
import dataReducer from "../features/data/data.slice";
import windowWidthReducer from "../features/windowWidth/windowWidth.slice";
import pauseReducer from "../features/pauseHeroPage/pauseHeroPage";
import changeLanguageReducer from '../features/changeLanguage/changeLanguage.slice'
import productCategoriesReducer from '../features/products/productCategories/productCategories.slice'
import createSagaMiddleware from "@redux-saga/core";
import filterReducer from '../components/products/features/filter.slice'
import resetFilterReducer from '../components/products/features/resetFilters.slice'
import sliderAnimSpeedReducer from '../components/products/features/sliderAnimSpeed.slice'
import filterChangedReducer from '../components/products/features/filtersChanged.slice'
import rootSaga from "../saga/saga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: showAndHideMenuReducer,
    navButtons: navButtonsReducer,
    scrollPos: scrollYReducer,
    data: dataReducer,
    width: windowWidthReducer,
    pause: pauseReducer,
    lang: changeLanguageReducer,
    categories: productCategoriesReducer,
    filter: filterReducer,
    resetFilter: resetFilterReducer,
    changedFilters: filterChangedReducer,
    sliderSpeed: sliderAnimSpeedReducer
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
