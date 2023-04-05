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
import { StartLogoAnim } from './components/loaders/StartLogoAnim';
import { motion } from 'framer-motion';
import { YellowDetails } from './components/yellowDetails/YellowDetails';

// import { IProducts } from './interfaces/interfaces';

const variants = {
  from: {
    y: 0,
    // scale:1.2
  },
  to: {
    y: '-100%',
    // scale:0
  },
};

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
          {/* <motion.div
          className='position-fixed w-100 h-100 bg-dark-form'
          style={{zIndex:'3'}}
            variants={variants}
            initial="from"
            animate="to"
            transition={{
              duration: 1,
              type:'tween'
            }}
          ></motion.div> */}

          <Background />
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
              <Products />
              <YellowDetails/>
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
