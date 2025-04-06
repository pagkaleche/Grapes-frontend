"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { usePathname } from "next/navigation";

import { APIService } from "@/lib/APIService";

const registration = [
  { name: "Sign In", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

const pages = [
  { name: "About", href: "/about" },
  { name: "Artists", href: "/artists" },
  { name: "Book Now", href: "/booking" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ", href: "/FAQ" },
];

export const Menu = () => {
  const [registrationLink, setRegistrationLink] = useState(registration[0]);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [categories, setCategories] = useState([
    {
      name: "Gallery",
      featured: [
        {
          name: 'Tattoo',
          href: `/gallery/1`,
          imageSrc: '/image/gallery/category/Tattoo.jpg',
          imageAlt: 'Tattoo',
        },
        {
          name: 'Makeup',
          href: `/gallery/4`,
          imageSrc: '/image/gallery/category/Makeup.png',
          imageAlt: 'Makeup',
        },
        {
          name: 'PhotoStudio',
          href: `/gallery/2`,
          imageSrc: '/image/gallery/category/PhotoStudio.jpg',
          imageAlt: 'Photo Studio',
        },
        {
          name: 'Nail Art',
          href: `/gallery/5`,
          imageSrc: '/image/gallery/category/NailArt.png',
          imageAlt: 'Microblading',
        }
      ],
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (pathname === "/signin") {
      setRegistrationLink(registration[1]);
    } else {
      setRegistrationLink(registration[0]);
    }
    const apiService = new APIService();

    async function getServices() {
      let services = await apiService.Services.getAll();
      let newCategories = [
        {
          name: "Gallery",
          featured: [],
        },
      ];
      for (let service of services) {
        newCategories[0].featured.push({
          name: service.name,
          href: `/gallery/${service.id}`,
          imageSrc: service.image,
          imageAlt: service.description,
        });
      }
      setCategories(newCategories);
    }
    getServices();
  }, [pathname]);

  return (
    <>
      <MobileMenu categories={categories} pages={pages} />
      <header className="hidden lg:block relative">
        <nav
          aria-label="Top"
          className="absolute inset-x-0 top-0 z-20 bg-transparent"
        >
          {/* Secondary navigation */}
          <div className="bg-transparent">
            <div className="flex justify-between px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50">
              <div className="p-8 flex h-16 items-center justify-between">
                {/* Desktop menu */}
                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {/* Logo (lg+) */}
                      <div className="hidden lg:flex lg:flex-1 lg:items-center">
                        <Link href="/">
                          <span className="sr-only">Grape</span>
                          <img
                            alt="Beauty and art in the form of a grapevine logo."
                            src="/images/logo.png"
                            className="h-8 w-auto"
                          />
                        </Link>
                      </div>
                      {categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                              <span className="relative hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                                {category.name}
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-10 h-0.5 transition duration-200 ease-out group-data-[open]:bg-black"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="group absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />
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
                                      <PopoverButton as={Link} href={item.href}>
                                        <img
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="aspect-square w-full rounded-md bg-gray-100 object-cover transition-opacity duration-300"
                                        />
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        <p
                                          aria-hidden="true"
                                          className="mt-1 hidden"
                                        >
                                          Book now
                                        </p>
                                      </PopoverButton>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}
                      {pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white hover:text-red-400"
                          onClick={(e) => {
                            if (page.href === "/#location-section") {
                              e.preventDefault();
                              if (window.location.pathname === "/") {
                                const section =
                                  document.getElementById("location-section");
                                if (section) {
                                  section.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              } else {
                                window.location.href = "/";
                                setTimeout(() => {
                                  const section =
                                    document.getElementById("location-section");
                                  if (section) {
                                    section.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 300);
                              }
                            }
                          }}
                        >
                          <span className="relative hover:text-red-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 hover:before:w-full">
                            {page.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
                <div className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                  <a
                    href={registrationLink.href}
                    className="text-md font-medium text-red-400 hover:text-gray-100 hover:bg-red-400 p-2 rounded-md "
                  >
                    {registrationLink.name}
                  </a>
                </div>

                {/* Show Account button if logged in */}
                {isLoggedIn && (
                  <Link
                    href="/account"
                    className="text-md font-medium text-red-400 hover:text-gray-100 hover:bg-red-400 p-2 rounded-md"
                  >
                    Account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

function PopoverCloseLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block font-medium text-gray-900"
      onClick={() => document.activeElement.blur()}
    >
      {children}
    </Link>
  );
}
