import { useEffect } from 'react';
import '../src/sass/main.scss';
import { dataPedding } from './features/data/data.slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { switchLanguage } from './features/changeLanguage/changeLanguage.slice';
import { RootState } from './app/store';
import { Home } from './pages/Home';
import { Details } from './pages/details/Details';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { CategoryProducts } from './pages/CategoryProducts';
import { onMainMenuShowHide } from './components/products/features/hideShowMainMenu.slice';
import { ImprintInfo } from './pages/ImprintInfo';
import { AGB } from './pages/AGB';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { PageNotFound } from './pages/PageNotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/category/:type/:id" element={<Details />} />
        <Route path="/category/:type" element={<CategoryProducts />} />
        <Route path="/imprint" element={<ImprintInfo />} />
        <Route path="/terms-and-conditions" element={<AGB />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound/>} />
      </Route>

    // {basename:'/hytec'},
    
    )
)

function App() {
  // const { dataIsLoaded, data, dataError } = useAppSelector(
  //   (state: RootState) => state.data
  // );
  const { language } = useAppSelector((state: RootState) => state.lang);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onMainMenuShowHide(false));
  }, []);

  useEffect(() => {
    const storedSelectedOption =
      sessionStorage.getItem('selectedOption') || language;
    dispatch(switchLanguage(storedSelectedOption));
  }, [dispatch, language]);

  useEffect(() => {
    dispatch(
      dataPedding(`${process.env.PUBLIC_URL}/json/${language}/data.json`)
    );
  }, [dispatch, language]);

  return <RouterProvider router={router} />;
}

export default App;
