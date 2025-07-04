import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/ourThoughts";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/career";

import AOS from "aos";
import "aos/dist/aos.css";


import { useEffect } from "react";
import BrandDoctorPage from "./pages/bakeTheBrand";
import { AuthProvider } from "./context/AuthContext";

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
    <main className="dark ">
          <AuthProvider>
            <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/what_we_do" />
        <Route element={<PricingPage />} path="/what_we_think" />
        <Route element={<BlogPage />} path="/who_we_are" />
        <Route element={<AboutPage />} path="/careers" />
        <Route element={<BrandDoctorPage />} path="/bake" />
      </Routes>
          </AuthProvider>
      
    </main>
  );
}

export default App;
