import Home from "pages/Home/Home";
import { Header } from "./Header/Header";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


export const App = () => {
  return (
    <div>
<Header/>
<Suspense>
<Routes>
  <Route path="/" element={<Home/>}/>
</Routes>
</Suspense>
    </div>
  );
};
