import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { APIService } from "@/lib/APIService";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const apiService = new APIService();
    async function fetchData() {
      let reviews = await apiService.Reviews.getAll();
      setReviews(reviews);
    }
    fetchData();
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and review.");
      return;
    }

    const newReview = {
      rating,
      text: reviewText,
      id: Date.now(),
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmitReview}>
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
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
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
