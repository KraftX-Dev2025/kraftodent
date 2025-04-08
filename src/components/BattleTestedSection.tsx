import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const BattleTestedSection = () => {
  return (
    <section className="py-16 bg-arini-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">BATTLE TESTED</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Over 10,000+ calls resolved <br /> every day in North America
          </h2>
          <p className="text-gray-600 mb-8">
            Trusted by hundreds of dental groups and practices across the US and Canada
          </p>
          <Button asChild className="rounded-full bg-arini-blue text-white hover:bg-arini-blue/90 px-6 py-6 h-auto">
            <Link href="/book-demo">Book Demo</Link>
          </Button>
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto mt-16 mb-24 relative">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/6753c3ad4ae7b9afbcbaf2e9_map.webp"
                alt="North America Map"
                fill
                className="object-contain"
              />

              {/* Map indicators */}
              <div className="absolute top-1/4 left-1/4">
                <div className="w-6 h-6 bg-arini-accent rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="text-xs font-medium mt-1">New York</div>
              </div>

              <div className="absolute top-1/3 right-1/3">
                <div className="w-6 h-6 bg-arini-accent rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="text-xs font-medium mt-1">Chicago</div>
              </div>

              <div className="absolute bottom-1/3 left-1/5">
                <div className="w-6 h-6 bg-arini-accent rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="text-xs font-medium mt-1">Los Angeles</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">*Not representative of real call locations</p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src="https://ext.same-assets.com/724755498/3416079285.png"
                  alt="Olaide Lawal"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold mt-2">Olaide Lawal</p>
              <p className="text-xs text-gray-500">President | Unified Dental Care</p>
            </div>
            <div>
              <p className="text-lg">
                Arini <span className="text-arini-accent">increased our revenue by 12%</span> by answering all our inbound calls. We were also able to <span className="text-arini-accent">reduce our headcount by 17%</span>, which coupled with answering every call, resulted in a <span className="text-arini-accent">24% increase in profits</span>. We are a fast growing DSO and Arini has been instrumental to our growth strategy.
              </p>
              <div className="mt-4">
                <Button variant="outline" className="border-arini-blue text-arini-blue">
                  Full Case Study
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/images/play-button.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="text-arini-accent"
                />
                <div className="text-sm font-semibold">With Arini</div>
              </div>
              <div className="text-xs text-gray-500">Capture missed production</div>
              <div className="h-32 relative mt-4">
                <div className="absolute inset-0 flex items-end">
                  <div className="w-1/6 h-1/4 bg-arini-accent rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/4 bg-arini-accent rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-3/4 bg-arini-accent rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-full bg-arini-accent rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-3/4 bg-arini-accent rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/4 bg-arini-accent rounded-t-sm mx-1"></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/images/play-button.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="text-arini-accent"
                />
                <div className="text-sm font-semibold">Your Front Desk</div>
              </div>
              <div className="text-xs text-gray-500">Stable call volume</div>
              <div className="h-32 relative mt-4">
                <div className="absolute inset-0 flex items-end">
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                  <div className="w-1/6 h-2/5 bg-gray-300 rounded-t-sm mx-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BattleTestedSection;
