"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { MobileMenu } from "./MobileMenu";
import { usePathname } from "next/navigation";

const navigation = {
  categories: [
    {
      name: "Gallery",
      featured: [
        {
          name: "Photo Studio",
          href: "/gallery/Photo-Studio",
          imageSrc: "/images/tat2.jpg",
          imageAlt: "Photo studio with professional lighting and equipment.",
        },
        {
          name: "Tattoo",
          href: "/gallery/Tattoo-Studio",
          imageSrc: "/images/tat1.jpg",
          imageAlt: "Artist applying tattoo to a client.",
        },
        {
          name: "Makeup",
          href: "/gallery/Makeup-Studio",
          imageSrc: "/images/makeup1.jpg",
          imageAlt:
            "Makeup accessories including brushes, lipstick, eye shadow, and nail polish.",
        },
        {
          name: "Nail Art",
          href: "/gallery/Nail-Art-Studio",
          imageSrc: "/images/nail1.png",
          imageAlt: "Collection of nail colors and nail art tools.",
        },
      ],
    },
  ],
  pages: [
    { name: "Artists", href: "/artists" },
    { name: "Appointments", href: "/appointments" },
    { name: "Location", href: "/#location-section" },
  ],
};

const registration = [
  { name: "Sign In", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

export const Menu = () => {
  const [fakeOpen, setfakeOpen] = useState(false);
  const [registrationLink, setRegistrationLink] = useState(registration[0]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/signin") {
      setRegistrationLink(registration[1]);
    } else {
      setRegistrationLink(registration[0]);
    }
  }, [pathname]);

  return (
    <>
      <MobileMenu navigation={navigation} />
      <header className="hidden lg:block relative">
        <nav
          aria-label="Top"
          className="absolute inset-x-0 top-0 z-20 bg-transparent"
        >
          {/* Secondary navigation */}
          <div className="bg-transparent">
            <div className="flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="p-8 flex h-16 items-center justify-between">
                {/* Desktop menu */}
                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {/* Logo (lg+) */}
                      <div className="hidden lg:flex lg:flex-1 lg:items-center">
                        <a href="/">
                          <span className="sr-only">Grape</span>
                          <img
                            alt="Beauty and art in the form of a grapevine logo."
                            src="/images/logo.png"
                            className="h-8 w-auto"
                          />
                        </a>
                      </div>
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out group-data-[open]:bg-black"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="group absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />
                            {/* Fake border when menu is open */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                            >
                              <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                            </div>

                            <div className="relative">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="relative hover:opacity-75"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-md bg-gray-100 object-cover transition-opacity duration-300"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-4 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p
                                        aria-hidden="true"
                                        className="mt-1 hidden"
                                      >
                                        Book now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white-700 hover:text-red-400"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
                <div className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                  <a
                    href={registrationLink.href}
                    className="text-sm font-medium text-white-700 hover:text-gray-500"
                  >
                    {registrationLink.name}
                  </a>
                </div>
                <button
                  type="button"
                  className="p-1 text-white-700 hover:text-gray-500 border-2 border-white "
                >
                  Appointment
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
