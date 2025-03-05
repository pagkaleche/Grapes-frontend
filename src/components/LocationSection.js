import React from "react";
import { motion } from 'framer-motion';
import BackToTop from "./BackToTop ";


export function LocationSection() {
  return (
    <section id="location-section" aria-labelledby="location-heading" className=" bg-black">
      <div className="mx-auto px-4 sm:px-6 sm:py-10 lg:px-8 lg:pt-12 border-t border-gray-600 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="location-heading"
              className="text-4xl font-bold tracking-tight text-white text-center md:text-left pt-10"
            >
              Location
            </h2>
            <p className="mt-4 text-sm text-white pr-11">
              Our studio is located in the heart of the city, easily accessible
              by public transport and with ample parking space.
            </p>
            <p className="mt-2 text-sm text-white pr-11">
              Address: 740 Richmond Street, Upper Level, London, Ontario N6A 3H3
            </p>
            <p className="mt-2 text-sm text-white pr-11">
              Phone: (123) 456-7890
            </p>
            <p className="mt-2 text-sm text-white pr-11">
              Email: info@example.com
            </p>
          </div>
          <div className="relative z-10 w-full h-auto overflow-hidden">
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
    </section>
  );
}
