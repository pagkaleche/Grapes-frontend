import { motion } from 'framer-motion';
import { childVariants } from './Variants';
import Link from 'next/link';

const Card = ({ artist }) => {
  return (
    <Link className="group hover:opacity-100" href={`artists/${artist.id}`}>
      <motion.div
        variants={childVariants}
        className="relative max-w-full min-h-[250px] lg:min-h-[350px] overflow-hidden shadow-lg mb-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent group-hover:opacity-0 opacity-80 z-10"></div>
        <img
          src={artist.image}
          alt={`${artist.user?.first_name || "Unknown"}'s image`}
          fill="true"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain"}}
          className="absolute top-0 left-0 w-full h-full z-0 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-between h-full">
          <h3 className="px-6 py-4 relative z-10 font-bold text-xl mb-2 text-white">
            {artist.user.first_name}
          </h3>
          <p className="text-gray-300 text-base">{artist.skill}</p>
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
    </Link>
  );
};

export default Card;
