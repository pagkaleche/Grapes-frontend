import Image from 'next/image';
import { motion } from 'framer-motion';
import {containerVariants, childVariants} from '@components/Variants';

const Card = ({ artist }) => {
  return (
    <motion.div variants={childVariants} className="max-w-full min-h-[250px] lg:min-h-[350px] overflow-hidden shadow-lg relative mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 z-10"></div>
      <Image
        src={artist.image}
        alt={`${artist.name}'s image`}
        fill
        style={{ objectFit: 'cover' }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className='absolute inset-0 z-20 flex flex-col justify-between h-full'>
        <div className="px-6 py-4 relative z-10">
          <h3 className="font-bold text-xl mb-2 text-white">{artist.name}</h3>
          <p className="text-gray-300 text-base">{artist.skill}</p>
        </div>
        <div className="px-6 pt-4 pb-2 relative z-10">
          {artist.instagram && (
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
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
  const artists = [
    { id: 1, name: 'Artem', skill: 'Makeup', image: '/images/artist/artem.png', instagram: 'https://instagram.com/artem' },
    { id: 2, name: 'David', skill: 'Nails', image: '/images/artist/david.png', instagram: 'https://instagram.com/david' },
    { id: 3, name: 'Max', skill: 'Tattoo', image: '/images/artist/maks.png', instagram: 'https://instagram.com/max' },
    { id: 4, name: 'Mikha', skill: 'Nails', image: '/images/artist/mikha.png', instagram: 'https://instagram.com/mikha' },
    { id: 5, name: 'Adrian', skill: 'Photography', image: '/images/artist/me.jpg', instagram: 'https://instagram.com/adrian' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
    >
      {artists.map((artist) => (
        <Card key={artist.id} artist={artist} />
      ))}
    </motion.div>
  );
};

export default ArtistGrid;
