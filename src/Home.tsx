import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Features from "./Features";
import Faq from "./Faq";
import Footer from "./Footer";

/**
 * Home Page Component
 * Renders the landing layout with: Navigation, Header, Features, FAQ, and Footer.
 */

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container my-5">
        <Header />
        <Features />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Home;
