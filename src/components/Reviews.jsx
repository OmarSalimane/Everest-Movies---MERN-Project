import React, { useState } from "react";
import { assets } from "../assets/assets";

export const ReviewSection = ({ mediaId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/50?img=1",
      rating: 4,
      date: "2025-03-15",
      comment:
        "Great show! The character development is outstanding and the plot keeps you on the edge of your seat.",
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/50?img=2",
      rating: 5,
      date: "2025-03-10",
      comment:
        "One of the best series I've watched this year. Can't wait for the next season!",
    },
    {
      id: 3,
      user: "Michael Johnson",
      avatar: "https://i.pravatar.cc/50?img=3",
      rating: 3,
      date: "2025-03-05",
      comment:
        "Decent show but the pacing feels off in some episodes. The acting is solid though.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      comment: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newReview.comment.trim() === "") return;

    const review = {
      id: reviews.length + 1,
      user: "Guest User",
      avatar: "https://i.pravatar.cc/50?img=8",
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview.comment,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    setShowForm(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={assets.star_icon}
          alt="star"
          className={`w-4 ${i < rating ? "opacity-100" : "opacity-30"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-12 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-white">
          Reviews ({reviews.length})
        </h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 bg-gray-800 p-6 rounded">
          <h3 className="text-xl text-white mb-4">Share Your Thoughts</h3>

          <div className="mb-4">
            <label className="block text-white mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <img
                    src={assets.star_icon}
                    alt={`${star} star`}
                    className={`w-6 ${
                      star <= newReview.rating ? "opacity-100" : "opacity-30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Your Review</label>
            <textarea
              className="w-full bg-gray-700 text-white p-2 rounded"
              rows="4"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="What did you think about this title?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 p-4 rounded">
            <div className="flex items-center mb-3">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-medium text-white">{review.user}</h4>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="text-gray-400 text-sm ml-2">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
