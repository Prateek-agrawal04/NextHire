import Header from '@/components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <div className="p-8 mt-10 text-center bg-gray-800 text-white">
  Made with ❤️ by{" "}
  <a href="https://www.linkedin.com/in/prateek-agrawal-a87301251/">
    Prateek Agrawal
  </a>
</div>
    </div>
  )
}
export default AppLayout
