import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function ArtistHeader({ artist }) {
  const UpperCaseName = artist?.user.first_name;
  return (
    <div className="flex justify-center items-end text-center sm:block pt-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="w-full text-left overflow-hidden align-bottom transition-all transform shadow-2xl sm:align-middle">
        <div className="w-full px-10 md:px-12 lg:px-24 relative">
          <div className="grid grid-cols-1">
            <div className="w-full flex flex-col items-center px-6 py-6">
              <div className="w-80 h-80 flex items-center justify-center rounded-full shadow-xl overflow-hidden">
                <img src={artist?.image} className="object-cover object-center w-full h-full" />
              </div>
              <p className="mt-6 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                {UpperCaseName}
              </p>
              <p className="mt-1 text-base font-medium text-white">
                {artist?.available_services[0]?.name} Artist
              </p>
              <p className="mt-3 text-base leading-relaxed text-center text-white italic">
                {artist?.description}
              </p>
              <div className="w-full mt-6 flex flex-col items-center">
                <a
                  className="flex items-center justify-center max-w-56 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  Book Appointment
                </a>

                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-white hover:text-gray-500">
                    <FaInstagram size={24} />
                  </a>
                  <a href="#" className="text-white hover:text-gray-500">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-white hover:text-gray-500">
                    <FaTwitter size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
