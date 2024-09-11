import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense } from "react";
import PageLoader from "../components/loaders/PageLoader";

const DefaultPage = () => {
  return (
    <div id="app-root">
      <Header />
      Default Page
      <main>
        <Suspense fallback={<PageLoader />}>
        <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default DefaultPage;
