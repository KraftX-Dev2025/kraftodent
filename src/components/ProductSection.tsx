import Image from 'next/image';

const ProductSection = () => {
  return (
    <section id="product" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">THE PRODUCT</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your complete AI solution <span className="text-gray-500">for patient communication.</span>
          </h2>
          <p className="text-gray-500">Faster. Smarter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-arini-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/play-button.svg"
                alt="Icon"
                width={24}
                height={24}
                className="text-arini-accent"
              />
              <h3 className="font-semibold text-xl">OmniChannel</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Engage with patients over calls or text messages.
            </p>
            <div className="rounded-lg bg-white p-2 h-40 relative">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674e7dbdc46e9558e421ad9f_product%20image%2001.webp"
                alt="OmniChannel Interface"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-arini-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/play-button.svg"
                alt="Icon"
                width={24}
                height={24}
                className="text-arini-accent"
              />
              <h3 className="font-semibold text-xl">Powerful scheduling logic</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Block scheduling, staggered appointments, and much more.
            </p>
            <div className="rounded-lg bg-white p-2 h-40 relative">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674e7e039884c83a1829f250_product%20image%2002.webp"
                alt="Scheduling Interface"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-arini-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/play-button.svg"
                alt="Icon"
                width={24}
                height={24}
                className="text-arini-accent"
              />
              <h3 className="font-semibold text-xl">Seamless Integrations</h3>
            </div>
            <p className="text-gray-600 mb-6">
              1-click integrations with your existing software.
            </p>
            <div className="rounded-lg bg-white p-2 h-40 relative">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674e7e1701c531ba9dded6ce_product%20image%2003.webp"
                alt="Integrations Interface"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-arini-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/play-button.svg"
                alt="Icon"
                width={24}
                height={24}
                className="text-arini-accent"
              />
              <h3 className="font-semibold text-xl">Stay in the loop</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Get notified of bookings & route calls to the appropriate department.
            </p>
            <div className="rounded-lg bg-white p-2 h-40 relative">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674e7e2b64276821e2e0e4d1_product%20image%2004.webp"
                alt="Notifications Interface"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-arini-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/play-button.svg"
                alt="Icon"
                width={24}
                height={24}
                className="text-arini-accent"
              />
              <h3 className="font-semibold text-xl">Customize Call Flow</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Define your custom call flow, test it, and deploy it.
            </p>
            <div className="rounded-lg bg-white p-2 h-40 relative">
              <Image
                src="https://cdn.prod.website-files.com/674d2db068caeb1508e1b2aa/674e7e4404f66afe452710b9_product%20image%2005.webp"
                alt="Call Flow Interface"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
