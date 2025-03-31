import React from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import BackToTop from "./BackToTop ";


export function LocationSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);
  const y = useTransform(scrollY, [100, 700], [50, 0]);
  const scale = useTransform(scrollY, [300, 600], [0.8, 1]);

  return (
    <section id="location-section" aria-labelledby="location-heading" className=" bg-black">
      <motion.div
        style={{
          opacity,
          y,
          scale,
          transformOrigin: "center",
        }}
        aria-hidden="true"
        className="flex mx-auto px-4 sm:px-6 lg:px-8 bg-black "
      >
        <div className="mx-auto px-4 sm:px-6 sm:py-10 lg:px-8 border-t border-gray-600 h-screen">
          <div >
            <div className="flex flex-col justify-center pb-10">
              <h2
                id="location-heading"
                className="text-4xl font-bold tracking-tight text-white text-center md:text-left pt-10"
              >
                Location
              </h2>
              <p className="mt-4 text-lg text-white pr-11">
                Our studio is located in the heart of the city, easily accessible
                by public transport and with ample parking space.
              </p>
              <p className="mt-2 text-lg text-white pr-11">
                Address: 740 Richmond Street, Upper Level, London, Ontario N6A 3H3
              </p>
              <p className="mt-2 text-lg">
                <a href="tel:+11234567890" className="text-white hover:underline hover:text-red-400">
                  Phone: (123) 456-7890
                </a>
              </p>
              <p className="mt-2 text-lg">
                <a href="mailto:info@example.com" className="text-white hover:underline hover:text-red-400">
                  Email: info@example.com
                </a>
              </p>
            </div>
            <div className="relative z-10 w-3/4 h-auto overflow-hidden">
              <a
                href="https://maps.app.goo.gl/rPVujKVfTeLqmsCRA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/map2.png"
                  alt="map"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <div className="flex justify-center mt-10">
              <BackToTop />
            </div>
          </div>
        </div>
      </motion.div>
    </section >
  );
}
