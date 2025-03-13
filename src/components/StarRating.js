import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-500 cursor-pointer"
            onClick={() => handleStarClick(i)}
          />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-500 cursor-pointer"
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-yellow-500 cursor-pointer"
            onClick={() => handleStarClick(i)}
          />
        );
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
