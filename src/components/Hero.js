
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import hero from "../../public/images/hero.png";
import { useEffect, useState } from "react";
export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
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
                    className="h-12 w-12 hidden sm:block"
                  />
                  <span className="relative mt-2 hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                    Photo
                  </span>

                </a>
                <a
                  href="/gallery/1"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/tattoo.png"
                    alt="Icon 2"
                    className="h-12 w-12 hidden sm:block"
                  />
                  <span className="relative mt-2 hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                    Tattoo
                  </span>

                </a>
                <a
                  href="/gallery/4"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/makeup.png"
                    alt="Icon 3"
                    className="h-12 w-12 hidden sm:block"
                  />
                  <span className="relative mt-2 hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                    Makeup
                  </span>

                </a>
                <a
                  href="/gallery/5"
                  className="flex flex-col items-center text-white hover:text-gray-300"
                >
                  <img
                    src="/images/nail.png"
                    alt="Icon 4"
                    className="h-12 w-12 hidden sm:block"
                  />
                  <span className="relative mt-2 hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                    Nails
                  </span>

                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
