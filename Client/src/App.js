import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import "./App.css";

const Layout = ({ children }) => (
  <>
    <Navbar title="Alimal" />
    {children}
    <Footer title="Alimal" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home description="Hãy đảm bảo bạn đã chuẩn bị đầy đủ để chăm sóc và yêu thương các em trước khi đón về nhà." />
            </Layout>
          } 
        />
        <Route 
          path="/services" 
          element={
            <Layout>
              <Services />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/pets" 
          element={
            <Layout>
              <Pets />
            </Layout>
          } 
        />
        <Route 
          path="/adopt-form" 
          element={
            <Layout>
              <AdoptForm />
            </Layout>
          } 
        />
        <Route 
          path="/admin" 
          element={<AdminLogin />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
