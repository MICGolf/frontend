import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default CommonLayout;
