import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/flowbite-ui/navbar"
import PageLoader from "../components/loaders/PageLoader"

const DefaultLayout = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-start items-start'>
      <Navbar />
      <main className='w-full h-full flex flex-col justify-start items-start'>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div >
  );
}

export default DefaultLayout;
