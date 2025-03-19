import { motion } from "framer-motion";
import { containerVariants } from "@components/Variants";
import Card from "@components/Card";
import { useEffect, useState } from "react";
import { APIService } from "@/lib/APIService";
import { Loading } from "./Loading";

const ArtistGrid = () => {
  const [artists, setArtists] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
    >
      {artists.length > 0 ? (
        artists.map((artist, index) => <Card key={artist.id} artist={artist} />)
      ) : (
        <p>No artists available.</p>
      )}
    </motion.div>
  );
};

export default ArtistGrid;
