import React from 'react';
import RestaurantHero from './components/RestaurantHero';
import PasesPricing from './components/PasesPricing';
import InteractiveMenu from './components/InteractiveMenu';

const Restaurant = () => {
  return (
    <div className="fade-in min-h-screen bg-metallic-white">
      <RestaurantHero />
      <PasesPricing />
      <InteractiveMenu />
    </div>
  );
};

export default Restaurant;
