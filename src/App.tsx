import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SEO } from "./components/SEO";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

// Lazy Loading Pages
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail"));
const Emergency = React.lazy(() => import("./pages/Emergency"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const ResponsiveHome = React.lazy(() => import("./pages/ResponsiveHome"));
const Legal = React.lazy(() => import("./pages/Legal"));
const LocalPage = React.lazy(() => import("./pages/local/LocalPage"));
const LandingPageCity = React.lazy(() => import("./pages/landing/LandingPageCity"));
const Pricing = React.lazy(() => import("./pages/Pricing"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (import.meta.env.DEV) {
      // Ensure dev server requests stay untouched.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      return;
    }

    const handleLoad = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <Router>
          <SEO />
          <Suspense fallback={<Loader onComplete={() => { }} />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<ResponsiveHome />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:serviceId" element={<ServiceDetail />} />
                <Route path="emergency" element={<Emergency />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="legal" element={<Legal />} />
                <Route path="tarifs-serrurier-paris" element={<Pricing />} />
                <Route path="serrurier-:slug" element={<LocalPage />} />
                <Route path="landing/:city" element={<LandingPageCity />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
}

export default App;
