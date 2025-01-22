import Nav from "@/components/Nav";
import Dashboard from "@/components/Dashboard";
import Input from "@/components/Input";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import '@/styles/globals.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Statistics from "@/components/Statistics";
import NotificationSettings from "@/components/NotificationSettings";
import LoginPage from "@/components/LoginPage";

const App = () => {

  // const [loginState, setLoginState] = useState<boolean>(false);

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
    <div>
      <Nav/>
    </div>
  );
};

export default App;
