"use client";
import { AboutSection } from '@/components/AboutSection'
import { ArtistsSection } from '@/components/ArtistsSection'
import { Hero } from '@/components/Hero'
import { LocationSection } from '@/components/LocationSection'
import { motion } from "framer-motion";
import {pageVariants} from '@/components/Variants'
import { Menu } from '@/components/Menu'
import { useEffect } from 'react';

export default function Home() {

  // useEffect(() => {
  //   fetch("http://40.233.78.121:8000/api/artists/", {
  //     method: "GET",
  //     headers: {
  //         "Authorization": "Token c9e2be2b5092655c106977520dd6781af6aaa168"
  //     }
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error("Error:", error));
  // }, []);
 
 
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <div className="bg-black">
        <main>
          <Menu/>
          <Hero />
          <AboutSection />
          <ArtistsSection />
          <LocationSection />
        </main>
      </div>
    </motion.div>
  )
}
