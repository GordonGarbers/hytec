import React, { useEffect } from 'react';
import '../src/sass/main.scss';
import { dataPedding } from './features/data/data.slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { switchLanguage } from './features/changeLanguage/changeLanguage.slice';
import { RootState } from './app/store';
import { Home } from './pages/Home';
import { Details } from './pages/details/Details';
import {createBrowserRouter, createRoutesFromElements, BrowserRouter as Router, Route, Link, NavLink, RouterProvider, useLocation, Routes, BrowserRouter} from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout';
import { setNext } from './features/next/next.slice';


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path=':type/:id' element={<Details/>}/>
      </Route>  ),
  {basename:process.env.PUBLIC_URL},
)

// console.log(process.env.PUBLIC_URL);
function App() {

  

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { language } = useAppSelector((state: RootState) => state.lang);


  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedSelectedOption =
      sessionStorage.getItem('selectedOption') || language;
    dispatch(switchLanguage(storedSelectedOption));
  }, [dispatch, language]);

  useEffect(() => {
    dispatch(dataPedding(`${process.env.PUBLIC_URL}/json/${language}/data.json`));
    // dispatch(dataPedding(`json/${language}/data.json`));
  }, [dispatch, language]);

  // useEffect(()=>{
  //   dispatch(setNext(4))
  // }, [dispatch])

  return (
      <RouterProvider router={router}/>
  );
}

export default App;
