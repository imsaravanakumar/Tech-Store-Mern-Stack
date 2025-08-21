import React from 'react';
import Hero from '../components/Layout/Hero';
import NewArrivals from '../pages/NewArrivals';
import AboutUs from '../components/Comman/Aboutus';
import ContactUs from '../components/Comman/ContactUs';

const Home = () => {
  return (
    <div>
      <Hero />
      <NewArrivals/>
      <AboutUs/>
      <ContactUs/>
    </div>
  );
};

export default Home;
