import React from 'react';
import HomeHero from './HomeHero';
import HomeFeatures from './HomeFeatures';
import HomeExplore from './HomeExplore';
import HomeAbout from './HomeAbout';
import HomeContact from './HomeContact';
import './HomePage.css';
import FeaturedCompanies from './FeaturedCompanies';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <HomeHero />
      <HomeFeatures />
      <HomeExplore />
      <HomeAbout />
      <FeaturedCompanies />
      <HomeContact />
      
    </div>
  );
};

export default HomePage;
