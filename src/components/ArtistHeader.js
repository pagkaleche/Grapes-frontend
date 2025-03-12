import React from "react";

export default function ArtistHeader({ artist }) {
  const UpperCaseName = artist?.user.first_name;
  return (
    <div className="flex justify-center items-end text-center sm:block">
      <div className="inline-block text-left border-white border-2 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:align-middle sm:max-w-xl sm:w-full">
        <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
          <div className="grid grid-cols-1">
            <div className="mt-4 mr-auto mb-4 ml-auto  max-w-lg">
              <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                <img
                  src={artist?.image}
                  className="flex-shrink-0 object-cover object-center btn- flex w-80 h-80 mr-auto mb-2 ml-auto rounded-full shadow-xl"
                />
                <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                  {UpperCaseName}
                </p>
                <p className="mt-3 text-base leading-relaxed text-center text-white">
                  {artist?.description}
                </p>
                <div className="w-full mt-6">
                  <a
                    className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white border-2 border-white transition duration-500 ease-in-out transform
                    hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Appointment
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
