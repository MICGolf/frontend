import Header from './Header';
import Footer from './Footer';
import { CommonLayoutProps } from './types';

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
