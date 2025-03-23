import ArtistGrid from "./ArtistGrid";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export function ArtistsSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [250, 700], [0, 1]);
  const y = useTransform(scrollY, [100, 700], [50, 0]);
  const scale = useTransform(scrollY, [700, 1400], [1, 0.7]);
  const blur = useTransform(scrollY, [300, 700], ["20px", "0px"]);

  return (
    <motion.div
        style={{
          // opacity,
          y,
          blur,
          transformOrigin: "center",
        }}
        aria-hidden="true"
      >
    <section aria-labelledby="artists-heading" className="relative bg-black mt-10" id="artists">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:pt-0">
        <h2
          id="artists-heading"
          className="flex pb-10 text-4xl font-bold tracking-tight text-white text-center"
        >
          Artists
        </h2>
        <ArtistGrid />
      </div>
    </section>
    </motion.div>
  );
}
