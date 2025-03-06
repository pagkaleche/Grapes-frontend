"use client";
import { motion } from "framer-motion";
import { containerVariants, childVariants } from "@components/Variants";
import { useParams } from "next/navigation";
import { useState } from "react";
import ArtistHeader from "@/components/ArtistHeader";

export default function page() {
  const params = useParams();
  const { artist } = params;
  const imageCount = 10;
  const getImagePath = (imageName) => `/images/artist/${artist}.png`;
  const imageIndices = Array.from(
    { length: imageCount },
    (_, index) => index + 1
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-background") {
      setSelectedImage(null);
    }
  };
  return (
    <div className="bg-neutral-950 text-white">
      <motion.div
        className="relative bg-cover bg-center h-4/6 flex items-center justify-center pt-16"
        style={{ backgroundImage: `url('/images/gallery/${artist}.png')` }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>
        <ArtistHeader name={artist}/>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {imageIndices.length > 0 ? (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {imageIndices.map((index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(getImagePath(index))}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={getImagePath(index)}
                    alt={`image ${artist}`}
                    className="object-cover object-center sm:w-48 md:w-64 lg:w-80 h-20 w-20 md:h-52 lg:h-64 group-hover:opacity-75 transition-opacity duration-300"
                    loading="lazy"
                    width={256}
                    height={256}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400">
            No items available in the {category} category yet. Check back later!
          </p>
        )}
      </motion.div>
      {selectedImage && (
        <div
          id="modal-background"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
