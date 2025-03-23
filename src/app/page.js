"use client";
import { ArtistsSection } from '@/components/ArtistsSection'
import { Hero } from '@/components/Hero'
import { motion } from "framer-motion";
import {pageVariants} from '@/components/Variants'
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@/store/store";

function Home() {
  const token = useAppSelector((state) => state.auth.token);

  console.log(token);
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
          <Hero />
          <ArtistsSection />
        </main>
      </div>
    </motion.div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
