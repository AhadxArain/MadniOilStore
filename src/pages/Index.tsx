// Madni Oil Store - Modern Car Workshop Website

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import Services from '@/components/Services';
import About from '@/components/About';

import ContactForm from '@/components/ContactForm';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <Services />
      <About />
      <ContactForm />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
