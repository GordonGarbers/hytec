import React, { useEffect } from 'react';
import '../src/sass/main.scss';
import { Header } from './components/header/Header';
import { MainNavigation } from './components/mainNavigation/MainNavigation';
import { Main } from './components/main/Main';
import { Hero } from './components/hero/Hero';
import { FlexMainWrapper } from './components/layout/FlexMainWrapper';
import { ContactUs } from './components/contactus/ContactUs';
import { Footer } from './components/footer/Footer';
import { Numbers } from './components/numbers/Numbers';
import { Land } from './components/Land/Land';
import { dataPedding } from './features/data/data.slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { switchLanguage } from './features/changeLanguage/changeLanguage.slice';
import { RootState } from './app/store';
import { Background } from './components/background/Background';
import { Products } from './components/products/Products';
// import { IProducts } from './interfaces/interfaces';

function App() {

  // const { dataIsLoaded, data, dataError } = useAppSelector(
  //   (state: RootState) => state.data
  // );


  const { language } = useAppSelector((state: RootState) => state.lang);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedSelectedOption =
      sessionStorage.getItem('selectedOption') || language;
    dispatch(switchLanguage(storedSelectedOption));
  }, [dispatch, language]);

  useEffect(() => {
    dispatch(dataPedding(`json/${language}/data.json`));
  }, [dispatch, language]);


  // const name = data.products.map((item:IProducts, idx: number)=>{
  //   const specs = item.specifications.map((spec:string, idx:number) => {
  //     const splitSpec = spec.split(":")
  //     return (
  //       <tr className='border' key={idx} >
  //         <td className='border p-1'>{splitSpec[0]}</td>
  //         <td className='border p-1'>{splitSpec[1]}</td>
  //         <td className='border p-1'>{splitSpec[2]}</td>
  //       </tr>
  //     )
  //   })
  //   return (
  //     <tbody key={idx} className='p-1'>{specs}</tbody>
  //   )
  // })

  return (
    <>
      
      <Background/>
      <Header />
      <MainNavigation />
      <FlexMainWrapper>
        <Main>
          <Hero />
          {/* <table style={{width:'600px', zIndex:'0'}} className='fs-13'>
            <thead className='bg-primary'>
            <th className='p-3'>Name</th>
            <th>Value</th>
            <th>Units</th>
            </thead>
            {name}
          </table> */}
          <Products/>
          <div style = {{maxWidth:'1400px', zIndex:'0'}} className="container-fluid bg-primary my-6 py-6 rounded-1 position-relative overflow-hidden">
            <div style={{left:'0px', top:'0px', clipPath: 'polygon(60% 100%, 100% 100%, 100% 0%, 65% 0%)'}} className='bg-primary-mono w-100 h-100 position-absolute'></div>
          </div>
          <Land />
          <Numbers />
          <ContactUs />
          <Footer />
        </Main>
      </FlexMainWrapper>
    </>
  );
}

export default App;
