import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-16 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-blue opacity-50"></div>
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-500">Welcome to Arini,</span> <span className="text-arini-blue">the AI Receptionist for Dentists.</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Trusted by hundreds of dental groups and practices across the US and Canada
          </p>
          <Button asChild className="rounded-full bg-arini-accent text-white hover:bg-arini-accent/90 px-6 py-6 h-auto">
            <Link href="#hero" className="flex items-center gap-2">
              <Image src="/images/play-button.svg" alt="Play" width={20} height={20} />
              See it in Action
            </Link>
          </Button>
        </div>

        {/* Logos section */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/3158037521.webp"
              alt="Woodside Dental Group"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/1578672984.webp"
              alt="Unified Dental Group"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/2913507275.png"
              alt="Dental Excellence Florida"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/1009604015.webp"
              alt="Partner Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/4038660161.webp"
              alt="Partner Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="https://ext.same-assets.com/724755498/3089115056.webp"
              alt="Partner Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
