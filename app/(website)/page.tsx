import HeroSection from "@/components/sections/HeroSection";
import FeaturedPets from "@/components/sections/FeaturedPets";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HappyFamiliesGallery from "@/components/sections/HappyFamiliesGallery";

import { NEXT_IS_PRERENDER_HEADER } from "next/dist/client/components/app-router-headers";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPets />
      <WhyChooseUs />
      <HappyFamiliesGallery />
      
    </>
  );
}