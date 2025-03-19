
import { motion, useScroll, useTransform } from "framer-motion";
import hero from "../../public/images/hero.png";
import { useEffect, useState } from "react";
export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const backgroundSize = useTransform(scrollY, [0, 600], ["100%", "200%"]);

  const [heroImage, setHeroImage] = useState(hero);

  useEffect(() => {
    const image = new Image();
    image.src = hero.src;
    image.onload = () => {
      setHeroImage(hero);
    };
  }, []);

  return (
    // <div className="relative z-10 lg:h-screen md:h-[60vh] sm:h-[60vh]">
    <div className="sticky top-0 lg:h-screen md:h-[60vh] sm:h-[60vh]">
      <motion.div
        style={{
          opacity,
          backgroundSize: "cover",
          backgroundImage: `url(${heroImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
        className="inset-0 flex flex-col h-screen"
      >
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="inset-0 flex flex-col"
        >
          <div className="absolute inset-0 bg-black opacity-50 h-screen" />
        </div>
        <div className="relative text-center sm:pb-0 sm:h-[60vh] lg:h-screen">
          <div className="relative h-screen flex flex-col justify-center">
            <div className="bg-black bg-opacity-50 py-6 px-20 rounded h-full w-full mx-auto justify-center items-center flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-xl md:text-2xl pb-10">
                What are you interested in?
              </h1>
              <div className="mt-8 grid grid-cols-2 gap-48 sm:grid-cols-4">
                <a
                  href="/gallery/2"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/photo.png"
                    alt="Icon 1"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Photo</span>
                </a>
                <a
                  href="/gallery/2"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/tattoo.png"
                    alt="Icon 2"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Tattoo</span>
                </a>
                <a
                  href="/gallery/4"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/makeup.png"
                    alt="Icon 3"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Makeup</span>
                </a>
                <a
                  href="/gallery/5"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/nail.png"
                    alt="Icon 4"
                    className="h-12 w-12"
                  />
                  <span className="mt-2">Nails</span>
                </a>
              </div>
              {/* appointment and rent */}
              {/* <div className="mt-24 lg:hidden pt-15 flex flex-row justify-space-between">
                <div className="flex flex-1 items-center justify-center">
                  <button
                    type="button"
                    className="p-1 text-white-700 hover:text-gray-500 border-2 border-white "
                  >
                    Appointment
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
