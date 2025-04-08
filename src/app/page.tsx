import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import BattleTestedSection from '@/components/BattleTestedSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <ProductSection />
      <BattleTestedSection />
      <Footer />
    </main>
  );
}
