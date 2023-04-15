import React, { useEffect } from 'react';
import '../src/sass/main.scss';
import { dataPedding } from './features/data/data.slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { switchLanguage } from './features/changeLanguage/changeLanguage.slice';
import { RootState } from './app/store';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import {createBrowserRouter, createRoutesFromElements, Route, Link, NavLink, RouterProvider} from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout';
import { setNext } from './features/next/next.slice';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='details/:type/:id' element={<Details/>}/>
    </Route>
  )
)

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
  }, [dispatch, language]);

  // useEffect(()=>{
  //   dispatch(setNext(4))
  // }, [dispatch])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
