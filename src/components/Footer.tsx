import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-arini-blue py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Logo and tagline */}
          <div className="md:col-span-4 lg:col-span-1 mb-8">
            <Link href="/#hero" className="flex items-center mb-4">
              <div className="relative h-10 w-32">
                <Image
                  src="/images/logo.svg"
                  alt="Arini logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-arini-blue-100 text-sm mb-6">
              Trusted by hundreds of DSOs, Dental Groups, and Solo Practices across the US and Canada
            </p>
            <div className="flex items-center">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674fe5c34993530221336e0c_logo%20HIPAA%20Compliant.webp"
                alt="HIPAA Compliant"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Learn Links */}
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/#hero" className="text-arini-blue-100 hover:text-white text-sm">
                See it in Action
              </Link>
              <Link href="/#product" className="text-arini-blue-100 hover:text-white text-sm">
                Product
              </Link>
              <Link href="/#case-studies" className="text-arini-blue-100 hover:text-white text-sm">
                Case Studies
              </Link>
              <Link href="/#analytics" className="text-arini-blue-100 hover:text-white text-sm">
                Analytics
              </Link>
              <Link href="/#adaptive" className="text-arini-blue-100 hover:text-white text-sm">
                Adaptive
              </Link>
              <Link href="https://arini.secureframetrust.com/" className="text-arini-blue-100 hover:text-white text-sm">
                Trust Center
              </Link>
            </nav>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="mailto:sales@arini.ai" className="text-arini-blue-100 hover:text-white text-sm">
                sales@arini.ai
              </Link>
              <Link href="tel:+14157159656" className="text-arini-blue-100 hover:text-white text-sm">
                +1 (415) 715-9656
              </Link>
              <Link href="https://twitter.com/usearini" className="text-arini-blue-100 hover:text-white text-sm">
                Twitter/X
              </Link>
              <Link href="https://www.linkedin.com/company/ariniai/" className="text-arini-blue-100 hover:text-white text-sm">
                LinkedIn
              </Link>
              <Link href="https://www.facebook.com/people/Arini/61556352192138/" className="text-arini-blue-100 hover:text-white text-sm">
                Facebook
              </Link>
              <Link href="https://www.ycombinator.com/companies/arini/jobs" className="text-arini-blue-100 hover:text-white text-sm">
                We are hiring!
              </Link>
            </nav>
          </div>

          {/* Terms Links */}
          <div>
            <h4 className="font-semibold mb-4">Terms</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="https://www.termsfeed.com/live/cd828be1-d796-403b-aca0-c03bda634959" className="text-arini-blue-100 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="https://www.termsfeed.com/live/f608374e-45e5-4bf0-bdd4-f36af787a0e5" className="text-arini-blue-100 hover:text-white text-sm">
                Terms of Use
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-arini-blue-200/30 text-center">
          <p className="text-arini-blue-100 text-sm">
            2023 Arini, all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
