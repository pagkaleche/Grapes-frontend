import { motion, useScroll, useTransform } from 'framer-motion';

const trendingProducts = [
  {
    id: 1,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#about us",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  // More products...
];

export function AboutSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);
  const y = useTransform(scrollY, [100, 700], [50, 0]);
  const scale = useTransform(scrollY, [700, 1400], [1, 0.7]);
  const blur = useTransform(scrollY, [300, 700], ["20px", "0px"]);

  return (
    <section aria-labelledby="about-heading" className='relative' id='about us'>
      <motion.div
        style={{
          opacity,
          y,
          scale,
          blur,
          transformOrigin: "center",
        }}
        aria-hidden="true"
        className="flex mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 bg-black"
      >
        <div className="flex mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 bg-black h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:h-auto">
            {/* heading and text */}
            <div className="flex flex-col lg:pb-20 justify-center">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-white"
              >
                About Grape
              </h2>
              <p className="mt-4 text-md text-white pr-11">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <button
                type="button"
                className="w-32 mt-10 text-md font-medium text-black hover:text-gray-300 border-2 border-white bg-white"
              >
                Gallery &rarr;
              </button>
            </div>

            {/* grid of images */}
            <div className="grid grid-cols-1 gap-4">
              <div className="relative w-full h-72 overflow-hidden rounded-md">
                <img
                  src="/images/tat2.jpg"
                  alt="tattoo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                <div className="relative w-full h-44 overflow-hidden rounded-md">
                  <img
                    src="/images/makeup1.jpg"
                    alt="makeup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-full h-44 overflow-hidden rounded-md">
                  <img
                    src="/images/nail1.png"
                    alt="nail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
