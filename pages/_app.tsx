import Nav from "@/components/Nav";
import Dashboard from "@/components/Dashboard";
import Input from "@/components/Input";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import '@/styles/globals.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Statistics from "@/components/Statistics";

const App = () => {

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 1000,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="flex"><Nav/><Dashboard /></div>} />
        <Route path="/input" element={<div className="flex"><Nav/><Input/></div>} />
        <Route path="/Statistics" element={<div className="flex"><Nav/><Statistics/></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
