import { motion } from "framer-motion";
import { containerVariants } from "@components/Variants";
import Card from "@components/Card";
import { useEffect, useState } from "react";
import { APIService } from "@/lib/APIService";
import { Loading } from "./Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ArtistGrid = () => {
  const [artists, setArtists] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    const apiService = new APIService();
    async function getArtists() {
      let artists = await apiService.Artists.getAll();
      setArtists(artists);
      setLoading(false);
    }
    getArtists();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[500] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const toggleFavorite = (artistId) => {
    setFavorites((prev) =>
      prev.includes(artistId)
        ? prev.filter((fav) => fav !== artistId)
        : [...prev, artistId]
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 pb-10"
    >
      {artists.length > 0 ? (
        artists.map((artist, index) => (
          <div className="relative" key={index}>
            <Card key={artist.id} artist={artist} />
            <div
              className="absolute border-white border-2 rounded-full w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm bottom-5 right-5 z-20 cursor-pointer"
              onClick={() => toggleFavorite(artist.id)}
            >
              {favorites.includes(artist.id) ? <FaHeart className="text-purple-500"/> : <FaRegHeart />}
            </div>
          </div>
        ))
      ) : (
        <p>No artists available.</p>
      )}
    </motion.div>
  );
};

export default ArtistGrid;
