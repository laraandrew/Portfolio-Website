import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import Photography from "./pages/Photography";
import Projects from "./pages/Projects";
import ResumeAbout from "./pages/ResumeAbout";

import "./index.css";

/** Static wrapper component defined at module scope (satisfies eslint rule) */
function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrap><Home /></PageWrap>} />
        <Route path="/photography" element={<PageWrap><Photography /></PageWrap>} />
        <Route path="/projects" element={<PageWrap><Projects /></PageWrap>} />
        <Route path="/resume" element={<PageWrap><ResumeAbout /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Show splash only once per tab session
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return !sessionStorage.getItem("splashScreenShown");
  });

  // Called once by SplashScreen when finished
  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("splashScreenShown", "true");
    setShowSplash(false);
  }, []);

  return (
    <BrowserRouter>
      {showSplash && (
        <SplashScreen
          isLoading={showSplash}
          onLoadingComplete={handleSplashComplete}
        />
      )}

      <div
        className="min-h-screen bg-gray-950 text-white"
        style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#ffffff" }}
      >
        <NavBar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
