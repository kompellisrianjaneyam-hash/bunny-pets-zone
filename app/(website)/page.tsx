import HeroSection from "@/components/sections/HeroSection";
import FeaturedPets from "@/components/sections/FeaturedPets";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HappyFamiliesGallery from "@/components/sections/HappyFamiliesGallery";

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