"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";

export const MobileMenu = ({ categories, pages }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Dialog
        open={openMenu}
        onClose={setOpenMenu}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-gray-500 data-[selected]:text-gray-500"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block text-sm font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <header className="relative lg:hidden">
        <nav
          aria-label="Top"
          className="absolute inset-x-0 top-0 z-20 bg-transparent"
        >
          {/* Secondary navigation */}
          <div className="bg-transparent">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="p-8 flex h-16 items-center justify-between">
                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(true)}
                    className="-ml-2 rounded-md bg-slate-700 p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="size-6"
                      onClick={() => setOpenMenu(true)}
                    />
                  </button>

                  {/* Search */}
                  <a
                    href="#"
                    className="ml-2 p-2 text-gray-400 hover:text-gray-500 hidden"
                  >
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="/" className="lg:hidden">
                  <span className="sr-only">Grape</span>
                  <img alt="" src="/images/logo.png" className="h-8 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
