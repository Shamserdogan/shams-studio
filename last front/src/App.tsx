import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import MouseGlow from "./components/ui/MouseGlow";
import BackgroundParticles from "./components/ui/BackgroundParticles";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import NotFound from "../app/not-found";
import BlogDetail from "./pages/BlogDetail";
import AdminPage from "./pages/AdminPage";
import { Toaster } from 'react-hot-toast';

function BuggyComponent(): React.ReactNode {
  throw new Error("Demonstration of the autonomous Shams Studio error telemetry catch.");
  return null;
}

export default function App() {
  
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

 
  if (showProject) {
  return <ProjectDetails />;
}

  // Render 404 screen if routing hash matches
  if (currentHash === "#404") {
    return <NotFound />;
  }
  if (currentHash.startsWith("#project-")) {
  return <ProjectDetails />;
}

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-200 relative">
        <Toaster position="top-right" />
        {/* Background and Interactive System layers */}
        <BackgroundParticles />
        <MouseGlow />

        {/* Trigger a simulated crash if hash is #error */}
        {currentHash === "#error" && <BuggyComponent />}
        
        {/* Primary Page Layout */}
        <Navbar />
        <Routes>
  <Route path="/" element={<Home />} />
   <Route path="/about" element={<About />} />
   <Route path="/services" element={<Services />} />
   <Route path="/portfolio" element={<Portfolio />} />
   <Route path="/blog" element={<Blog />} />
   <Route path="/blog/:id" element={<BlogDetail />} />
   <Route path="/contact" element={<Contact />} />
   <Route
  path="/testimonials"
  element={<Testimonials />}
/>
<Route path="/admin" element={<AdminPage />} />
</Routes>
        <Footer />

        
      </div>
       </ErrorBoundary>
    </BrowserRouter>
  );
}


