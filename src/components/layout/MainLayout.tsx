import { Background } from '../background/Background';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Main } from '../main/Main';
import { MainNavigation } from '../mainNavigation/MainNavigation';
import { FlexMainWrapper } from './FlexMainWrapper';
import { Outlet} from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Background />
      <Header />
      <MainNavigation />
      <FlexMainWrapper>
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </FlexMainWrapper>
    </div>
  );
};
