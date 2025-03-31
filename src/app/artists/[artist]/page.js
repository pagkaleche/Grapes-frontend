"use client";
import { motion } from "framer-motion";
import { containerVariants, childVariants } from "@components/Variants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArtistHeader from "@/components/ArtistHeader";
import { APIService } from "@/lib/APIService";
import { Loading } from "@/components/Loading";

export default function ArtistsSection() {
  const params = useParams();
  const artistId = params.artist;

  const [artist, setArtist] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiService = new APIService();
    async function fetchData() {
      let artist = await apiService.Artists.getById(artistId);
      setArtist(artist);
      let photos = await apiService.Photos.getAll({
        artist: artistId,
      });
      setPhotos(photos);
      setLoading(false);
    }
    fetchData();
  }, [artistId]);

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-background") {
      setSelectedImage(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>
        <ArtistHeader artist={artist} />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {photos.length > 0 ? (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                className="group cursor-pointer"
                initial="hidden"
                animate="visible"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(photo.image)}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={photo.image}
                    alt={photo.description}
                    className="object-cover object-center sm:w-48 md:w-64 lg:w-80 h-20 md:h-52 lg:h-64 group-hover:opacity-75 transition-opacity duration-300"
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
            No items available for the {artist?.user.first_name} category yet.
            Check back later!
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
