import React from 'react'
import { Home } from '../../pages/Home'
import { Background } from '../background/Background'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import { Main } from '../main/Main'
import { MainNavigation } from '../mainNavigation/MainNavigation'
import { FlexMainWrapper } from './FlexMainWrapper'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

export const MainLayout = () => {
    return(
      
      <div className='main-layout'>
              <Background />
              <Header />
              <MainNavigation />
              <FlexMainWrapper>
                <Main>
                  <Outlet/>
                </Main>
              <Footer />
              </FlexMainWrapper>
        </div>
    )
} 