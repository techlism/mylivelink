import Link from "next/link"

import FeatureSection from './FeatureSection';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div  className="flex flex-col min-h-screen">
      {/* <Navbar/> */}
      <HeroSection/>        
      <FeatureSection/>
      <Footer/>
    </div>
  )
}


