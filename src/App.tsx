import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Gallery from './pages/Gallery';
import Inspire from './pages/Inspire';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:categorySlug/:serviceSlug" element={<ServiceDetail />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="inspire" element={<Inspire />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
