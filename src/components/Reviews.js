import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "./StarRating";
import { APIService } from "@/lib/APIService";
import { FaStar } from "react-icons/fa";

const ReviewsSection = ({ artistId }) => {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedRating, setSelectedRating] = useState("All");

  const ratings = [
    { value: "All", label: "All Ratings" },
    { value: 5, label: [1, 2, 3, 4, 5] },
    { value: 4, label: [1, 2, 3, 4] },
    { value: 3, label: [1, 2, 3] },
    { value: 2, label: [1, 2] },
    { value: 1, label: [1] },
  ];

  useEffect(() => {
    const apiService = new APIService();
    const categoryId = category ? Number(category) : null;
    const artistID = artistId ? Number(artistId) : null;

    async function fetchData() {
      let reviews = await apiService.Reviews.getAll();

      let filteredReviews = reviews.filter((review) => {
        if (artistID) {
          return review.artist?.id === artistID;
        } else if (categoryId) {
          return review.provided_service?.id === categoryId;
        }
        return true;
      });

      setReviews(filteredReviews);

      if (!artistID) {
        let servicesArray = await apiService.Services.getAll();
        let filteredServices = servicesArray.filter((service) => service.id === categoryId);
        setServices(filteredServices);
      } else {
        let artist = await apiService.Artists.getById(artistId);
        setArtist(artist);
      };

      let artistsArray = await apiService.Artists.getAll();
      let filteredArtists = artistsArray.filter(artist =>
        artist.available_services.some(service => service.id === categoryId)
      );
      setArtists(filteredArtists);
    }

    fetchData();
  }, [category, artistId]);

  useEffect(() => {
    if (selectedRating === "All") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter(review => review.rating === Number(selectedRating)));
    }
  }, [selectedRating, reviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0 || reviewDescription.trim() === "") {
      alert("Please provide a rating and review.");
      return;
    }

    const apiService = new APIService();
    const newReview = {
      rating,
      artist: artistId || selectedArtist?.id,
      provided_service: artist?.available_services[0]?.id || services[0]?.id,
      provided_at: null,
      description: reviewDescription,
    };

    await apiService.Reviews.create(newReview);

    let updatedReviews = await apiService.Reviews.getAll();
    let filteredReviews = updatedReviews.filter((review) =>
      artistId
        ? review.artist?.id === Number(artistId)
        : category
          ? review.provided_service?.id === Number(category)
          : true
    );

    setReviews(filteredReviews);
    setFilteredReviews(filteredReviews);
    setReviewDescription("");
    setRating(0);
    setSelectedArtist(null);
    setSelectedService(null);
  };


  return (
    <div className="p-4 max-w-5xl mx-auto overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <form onSubmit={handleSubmitReview} className="flex-1 pt-8">
          {!artistId && (
            <>
              <label>Choose an Artist</label>
              <select
                id="selectArtist"
                className="m-2 ml-2 text-black align-middle"
                onChange={(e) => setSelectedArtist({ id: e.target.value })}
              >
                <option>Select</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id} className="text-center m-2">
                    {artist.user.first_name}
                  </option>
                ))}
              </select>
            </>
          )
          }
          <br />
          {!category && !artistId && (
            <>
              <label>Choose a Service</label>
              <select
                id="selectService"
                className="m-2 text-black align-middle"
                onChange={(e) => setSelectedService({ id: e.target.value })}
              >
                <option>Select</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating:
            </label>
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Your Review:
            </label>
            <textarea
              id="review"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              rows="3"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center mt-8 justify-center max-w-56 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            Submit Review
          </button>
        </form>
        <div className="mt-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <label className="block text-sm font-medium text-gray-700">Filter by Rating:</label>
          <div className="flex flex-col gap-2 mt-2 mb-10 w-1/3">
            {ratings.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedRating(value)}
                className={`flex items-center px-3 py-2 text-slate-700 ${selectedRating == value ? "bg-gray-300" : "bg-#0a0a0a"
                  }`}
              >
                {value === "All" ? "All" : label.map((_, i) => <FaStar key={i} className="text-yellow-500" />)}
              </button>
            ))}
          </div>

          {filteredReviews.length === 0 ? (
            <p>No reviews found for the selected rating.</p>
          ) : (
            <div>
              {filteredReviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <div className="flex items-center">
                    <StarRating rating={review.rating} setRating={() => { }} />
                    <span className="ml-2 text-sm text-gray-500">Rating: {review.rating}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
