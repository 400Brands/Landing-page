import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { Preloader } from "./layouts/preloader.tsx";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This ensures the preloader is shown for at least a minimum time
    // to prevent flickering on fast loads
    const minLoadingTime = 1500; // 1.5 seconds minimum loading time
    const startTime = Date.now();

    // Simulate any initial app loading or resource fetching here
    const handleAppLoaded = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Ensure minimum display time for the preloader
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    };

    // When all resources are loaded
    window.addEventListener("load", handleAppLoaded);

    // Fallback in case the load event has already fired
    if (document.readyState === "complete") {
      handleAppLoaded();
    }

    return () => {
      window.removeEventListener("load", handleAppLoaded);
    };
  }, []);

  return loading ? <Preloader /> : <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Root />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
