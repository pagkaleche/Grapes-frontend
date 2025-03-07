import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, childVariants } from "@components/Variants";

import { useEffect, useState } from "react";
import { APIService } from "@/lib/APIService";

const Card = ({ artist }) => {
  return (
    <motion.div
      variants={childVariants}
      className="max-w-full min-h-[250px] lg:min-h-[350px] overflow-hidden shadow-lg relative mb-4"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 z-10"></div>
      <Image
        src={artist.image}
        alt={`${artist.user.first_name}'s image`}
        fill
        style={{ objectFit: "cover" }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-between h-full">
        <a className="px-6 py-4 relative z-10" href={`artists/${artist.id}`}>
          <h3 className="font-bold text-xl mb-2 text-white">
            {artist.user.first_name}
          </h3>
          <p className="text-gray-300 text-base">{artist.skill}</p>
        </a>
        <div className="px-6 pt-4 pb-2 relative z-10">
          {artist.instagram && (
            <a
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-black text-white px-2 py-1 rounded hover:bg-red-400 hover:text-black transition-colors duration-300 ease-in-out">
                Instagram &rarr;
              </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ArtistGrid = () => {
  const [artists, setArtists] = useState([]);

  const artistsMock = [
    {
      id: 6,
      user: { first_name: "Yana", last_name: "" },
      image: "http://40.233.78.121/media/compressed_yana.jpg",
      available_services: [{ id: 4, name: "makeup", description: "" }],
    },
    {
      id: 5,
      user: { first_name: "Ralph", last_name: "" },
      image: "http://40.233.78.121/media/compressed_ralph.jpg",
      available_services: [{ id: 1, name: "tattoo", description: "" }],
    },
    {
      id: 4,
      user: { first_name: "Liza", last_name: "" },
      image: "http://40.233.78.121/media/compressed_liza.jpg",
      available_services: [{ id: 5, name: "nails", description: "" }],
    },
    {
      id: 3,
      user: { first_name: "Lina", last_name: "" },
      image: "http://40.233.78.121/media/compressed_lina.jpg",
      available_services: [{ id: 1, name: "tattoo", description: "" }],
    },
    {
      id: 2,
      user: { first_name: "Maxim", last_name: "" },
      image: "http://40.233.78.121/media/compressed_max.jpg",
      available_services: [{ id: 1, name: "tattoo", description: "" }],
    },
    {
      id: 1,
      user: { first_name: "Kate", last_name: "" },
      image: "http://40.233.78.121/media/compressed_kate.jpg",
      available_services: [{ id: 2, name: "photo session", description: "" }],
    },
  ];

  useEffect(() => {
    const apiService = new APIService();

    async function getArtists() {
      await apiService.Auth.login("admin@admin.admin", "TbwFhEdNrkim");
      // await apiService.Auth.register("email", "password");

      let allServices = await apiService.Services.getAll();
      console.log("allServices", allServices);
      let createdService = await apiService.Services.create({
        name: "test",
        description: "test",
      });
      console.log("createdService", createdService);
      let updatedService = await apiService.Services.update(createdService.id, {
        name: "updatedTest",
        description: "updatedTest",
      });
      console.log("updatedService", updatedService);
      let deletedService = await apiService.Services.delete(updatedService.id);
      console.log("deletedService", deletedService);

      let artists = await apiService.Artists.getAll();
      console.log(artists);
      // setArtists(artists);
    }

    getArtists();
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
    >
      {artistsMock.map((artist) => (
        <Card key={artist.id} artist={artist} />
      ))}
    </motion.div>
  );
};

export default ArtistGrid;
