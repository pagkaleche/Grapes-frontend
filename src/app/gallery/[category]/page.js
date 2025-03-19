"use client";

import { motion } from "framer-motion";
import { containerVariants, childVariants } from "@components/Variants";
import ReviewsSection from "@/components/Reviews";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { APIService } from "@/lib/APIService";
import { Loading } from "@/components/Loading";

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryName, setCategoryName] = useState("loading");
  const [categoryImage, setCategoryImage] = useState("/images/smoke.png");
  const [photos, setPhotos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-background") {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    const apiService = new APIService();

    async function getServices() {
      let services = await apiService.Services.getAll();
      const matchedService = services.find(
        (service) => service.id.toString() === category
      );

      if (matchedService) {
        setCategoryName(matchedService.name);
        setCategoryImage(matchedService.image);
      } else {
        setCategoryName("Unknown Category");
      }
    }
    getServices();
  }, [category]);

  useEffect(() => {
    const apiService = new APIService();

    async function fetchData() {
      try {
        let photos = await apiService.Photos.getAll({
          artist__available_services: category,
        });
        const imageUrls = photos.map((photo) => photo.image);
        setPhotos(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]);
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-neutral-950 text-white">
      <motion.div
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: `url(${categoryImage})` }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>
        <h1 className="text-4xl font-bold uppercase text-center text-white p-6 z-10">
          {categoryName} Gallery
        </h1>
      </motion.div>

      {loading && <Loading />}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {photos.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {photos.map((image, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(image)}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="object-cover object-center w-full h-72 group-hover:opacity-75 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400">
            No photos available in the {categoryName} category yet. Check back
            later!
          </p>
        )}
      </motion.div>
      {selectedImage && (
        <div
          id="modal-background"
          className="fixed inset-0 z-50 bg-black bg-opacity-75 justify-center items-center flex"
          onClick={closeModal}
        >
          <div className="relative flex flex-col overflow-y-auto md:flex-row p-4 bg-black rounded-lg shadow-lg max-w-4xl w-5/6 h-5/6">
            <div className="mb-4 md:mr-4 w-full md:w-2/3">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-grow w-full md:w-1/3 h-full md:overflow-y-auto">
              <ReviewsSection />
            </div>
          </div>
        </div>
      )}
      <ReviewsSection />
    </div>
  );
};

export default CategoryPage;
