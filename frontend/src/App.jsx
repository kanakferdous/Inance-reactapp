import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DynamicPage from "./pages/DynamicPage";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MenuSettings from './pages/MenuSettings';
import TopBarSettings from './pages/TopBarSettings';
import FooterSettings from './pages/FooterSettings';
import HeroSettings from './pages/HeroSettings';
import PageSettings from "./pages/PageSettings";
import FeatureSettings from "./pages/FeatureSettings";
import AboutUsSettings from "./pages/AboutUsSettings";
import ProfessionalSettings from "./pages/ProfessionalSettings";
import ServiceSettings from './pages/ServiceSettings';
import TestimonialSettings from './pages/TestimonialSettings';
import ContactSectionSettings from './pages/ContactSectionSettings';
import ContactSubmissions from './pages/ContactSubmissions';

function App () {
  const location = useLocation();
  const authPages = [
    "/login",
    "/forgot-password",
    "/register",
    "/dashboard",
    "/dashboard/site-settings/menu",
    "/dashboard/site-settings/topbar",
    "/dashboard/site-settings/footer",
    "/dashboard/homepage-settings/hero",
    "/dashboard/page-settings",
    "/dashboard/homepage-settings/feature",
    "/dashboard/homepage-settings/about-us",
    "/dashboard/homepage-settings/professional",
    "/dashboard/homepage-settings/service",
    "/dashboard/homepage-settings/testimonial",
    "/dashboard/homepage-settings/contact",
    "/dashboard/form-data",
  ];
  const hideLayout = authPages.includes(location.pathname);
  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/site-settings/menu"
          element={
            <ProtectedRoute>
              <MenuSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/site-settings/topbar"
          element={
            <ProtectedRoute>
              <TopBarSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/site-settings/footer"
          element={
            <ProtectedRoute>
              <FooterSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/hero"
          element={
            <ProtectedRoute>
              <HeroSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/page-settings"
          element={
            <ProtectedRoute>
              <PageSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/feature"
          element={
            <ProtectedRoute>
              <FeatureSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/about-us"
          element={
            <ProtectedRoute>
              <AboutUsSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/professional"
          element={
            <ProtectedRoute>
              <ProfessionalSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/service"
          element={
            <ProtectedRoute>
              <ServiceSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/testimonial"
          element={
            <ProtectedRoute>
              <TestimonialSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/homepage-settings/contact"
          element={
            <ProtectedRoute>
              <ContactSectionSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/form-data"
          element={
            <ProtectedRoute>
              <ContactSubmissions />
            </ProtectedRoute>
          }
        />
        <Route path="/:slug" element={<DynamicPage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;