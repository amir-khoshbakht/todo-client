import Header from './Header';
// import Footer from './Footer';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};
export default Layout;
