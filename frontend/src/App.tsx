import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import BakeTheBrandPage from "./pages/bakeTheBrand";

import AOS from "aos";
import "aos/dist/aos.css";


import { useEffect } from "react";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      disable: "mobile",
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/what_we_think" />
      <Route element={<BlogPage />} path="/who_we_are" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<BakeTheBrandPage />} path="/bake" />
    </Routes>
  );
}

export default App;
