import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export function AboutSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [150, 400], [1, 0]);
  const y = useTransform(scrollY, [100, 700], [50, 0]);
  const scale = useTransform(scrollY, [700, 1400], [1, 0.7]);
  const blur = useTransform(scrollY, [300, 700], ["20px", "0px"]);

  return (
    <section aria-labelledby="about-heading" className='relative mt-10' id='about us'>
      <motion.div
        style={{
          opacity,
          y,
          scale,
          blur,
          transformOrigin: "center",
        }}
        aria-hidden="true"
        className="flex mx-auto px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="flex mx-auto px-4 sm:px-6 lg:px-8 bg-black h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:h-auto">
            {/* heading and text */}
            <div className="flex flex-col mt-10">
              <h2
                id="trending-heading"
                className="text-4xl font-bold tracking-tight text-white"
              >
                About Grape
              </h2>
              <p className="mt-4 text-lg text-white pr-11">
                At Grapes Studio, we believe in making every experience personal, whether it's finding the perfect artist or selecting the right service for your needs. Our mission is to connect talented professionals with clients seeking exceptional skills and services, all in one place. Whether you're looking for a creative tattoo, a makeup transformation, or a new nail design, we've got you covered.
              </p>
              <p className="mt-4 text-lg text-white pr-11">
                Join us today and discover a new world of creativity and self-expression!
              </p>
              <Link href="/booking">
                <button
                  type="button"
                  className="flex items-center mt-8 justify-center max-w-56 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  Book Now
                </button>
              </Link>
            </div>

            {/* grid of images */}
            <div className="grid grid-cols-1">
              <div className="relative w-full h-64 overflow-hidden rounded-md">
                <img
                  src="/images/tat2.jpg"
                  alt="tattoo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="relative w-full h-52 overflow-hidden rounded-md">
                  <img
                    src="/images/makeup1.jpg"
                    alt="makeup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-full h-52 overflow-hidden rounded-md">
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
