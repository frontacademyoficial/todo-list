import Header from "./Header";
import BaseLayout from "./BaseLayout";
import Page from "./Page";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <BaseLayout>
      <div id="app-container">
        <Header />
        <Page>{children}</Page>
        <Footer />
      </div>
    </BaseLayout>
  );
};

export default MainLayout;
