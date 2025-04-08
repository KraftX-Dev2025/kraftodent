import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link href="/#hero" className="flex items-center">
          <div className="relative h-8 w-24">
            <Image
              src="/images/logo.svg"
              alt="Arini logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Mobile menu */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-6 pt-12">
                <Link href="/#hero" className="text-arini-blue hover:text-arini-accent font-medium">
                  See it in Action
                </Link>
                <Link href="/#product" className="text-arini-blue hover:text-arini-accent font-medium">
                  Product
                </Link>
                <Link href="/#case-studies" className="text-arini-blue hover:text-arini-accent font-medium">
                  Case Studies
                </Link>
                <Link href="/#analytics" className="text-arini-blue hover:text-arini-accent font-medium">
                  Analytics
                </Link>
                <Link href="/#contact" className="text-arini-blue hover:text-arini-accent font-medium">
                  Contact
                </Link>
                <div className="pt-4">
                  <Button asChild className="w-full bg-arini-blue text-white hover:bg-arini-blue/90">
                    <Link href="/book-demo">Book Demo</Link>
                  </Button>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" className="w-full border-arini-blue text-arini-blue">
                    <Link href="https://my.arini.ai/">Login</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#hero" className="text-arini-blue hover:text-arini-accent font-medium">
            See it in Action
          </Link>
          <Link href="/#product" className="text-arini-blue hover:text-arini-accent font-medium">
            Product
          </Link>
          <Link href="/#case-studies" className="text-arini-blue hover:text-arini-accent font-medium">
            Case Studies
          </Link>
          <Link href="/#analytics" className="text-arini-blue hover:text-arini-accent font-medium">
            Analytics
          </Link>
          <Link href="/#contact" className="text-arini-blue hover:text-arini-accent font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://my.arini.ai/" className="text-arini-blue hover:text-arini-accent font-medium">
            Login
          </Link>
          <Button asChild className="bg-arini-blue text-white hover:bg-arini-blue/90">
            <Link href="/book-demo">Book Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
