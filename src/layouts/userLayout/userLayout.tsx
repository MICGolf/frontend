import Header from './Header';
import Footer from './Footer';
import { UserLayoutProps } from './types';

const userLayout = ({ children }: UserLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default userLayout;
