import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { APIService } from "@/lib/APIService";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [artists, setArtists] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const apiService = new APIService();
    async function fetchData() {
      let reviews = await apiService.Reviews.getAll();
      setReviews(reviews);
      let servicesArray = await apiService.Services.getAll();
      setServices(servicesArray);
      let artistsArray = await apiService.Artists.getAll();
      setArtists(artistsArray);
    }
    fetchData();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0 || reviewDescription.trim() === "") {
      alert("Please provide a rating and review.");
      return;
    }

    const apiService = new APIService();
    const newReview = {
      rating,
      artist: selectedArtist.id,
      provided_service: selectedService.id,
      provided_at: null,
      description: reviewDescription,
    };

    let createdReview = await apiService.Reviews.create(
      newReview,
    );
    let reviews = await apiService.Reviews.getAll();
    setReviews(reviews);

    setReviewDescription("");
    setRating(0);
    setSelectedArtist(null);
    setSelectedService(null);
  };

  return (
    <div className="p-4 max-w-lg mx-auto overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmitReview}>
        <label>Choose an Artist</label>
        <select
          id="selectArtist"
          className="m-2 text-center text-black align-middle w-40"
          onChange={(e) => setSelectedArtist({ id: e.target.value })}
        >
          <option>Select</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id} className="text-center m-2">
              {artist.user.first_name}
            </option>
          ))}
        </select>
        <br />
        <label>Choose a Service</label>
        <select
          id="selectService"
          className="m-2 text-center text-black align-middle w-40"
          onChange={(e) => setSelectedService({ id: e.target.value })}
        >
          <option>Select</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to write a review!</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="mb-4 border-b pb-4">
                <div className="flex items-center">
                  <StarRating rating={review.rating} setRating={() => {}} />
                  <span className="ml-2 text-sm text-gray-500">Rating: {review.rating}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
