import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import TopUniversities from './components/TopUniversities';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <TopUniversities />
      <CallToAction />
      <Footer />
    </main>
  );
}
