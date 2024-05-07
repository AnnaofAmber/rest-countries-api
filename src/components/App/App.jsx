import Home from 'pages/Home/Home';
import Country from 'pages/Country/Country';

import { Header } from '../Header/Header';
import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';


export const App = () => {
  return (
    <div>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name/*" element={<Country />} />
        </Routes>
      </Suspense>
    </div>
  );
};
