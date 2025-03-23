"use client";

import { AboutSection } from "@/components/AboutSection"
import { LocationSection } from "@/components/LocationSection"
import { pageVariants } from '@/components/Variants'
import { motion } from "framer-motion";

export default function About() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5 }}
        >
            <div className="pt-10 bg-black ">
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <AboutSection />
                    <LocationSection />
                </div>
            </div>
        </motion.div>
    )
}