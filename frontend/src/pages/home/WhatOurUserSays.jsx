import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const WhatOurUserSays = () => {
  const comments = [
    {
      userType: "buyer",
      username: "jane_doe",
      comment:
        "The translation was perfect and delivered on time. Highly recommend this translator!",
      rating: 5,
      date: "2024-08-10",
    },
    {
      userType: "seller",
      username: "linguist_master",
      comment:
        "Great client! Clear instructions and prompt payment. Looking forward to working together again.",
      rating: 5,
      date: "2024-08-12",
    },
    {
      userType: "buyer",
      username: "global_corp",
      comment:
        "Good translation, but communication could have been better. Took a bit longer than expected.",
      rating: 3,
      date: "2024-08-15",
    },
    {
      userType: "seller",
      username: "language_expert",
      comment:
        "Professional and easy to work with. I enjoyed the collaboration.",
      rating: 4,
      date: "2024-08-18",
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        What Our Users Say
      </h2>
      <div className="max-w-3xl mx-auto relative ">
        <div className="carousel w-full rounded-lg shadow-2xl overflow-hidden">
          {comments.map((comment, index) => (
            <div
              key={index}
              className={`carousel-item w-full flex flex-col items-center transition-transform duration-700 ease-in-out py-4 ${
                index === currentIndex ? "transform scale-100 opacity-100" : "transform scale-75 opacity-0"
              }`}
              style={{
                display: index === currentIndex ? "flex" : "none",
              }}
            >
              <div className="flex items-center justify-center text-6xl mb-4">
                <FaQuoteLeft />
              </div>
              <p className="text-xl text-center mb-6 px-8 italic">
                {comment.comment}
              </p>
              <div className="flex items-center justify-center text-6xl mb-4">
                <FaQuoteRight />
              </div>
              <div className="text-lg font-semibold mt-4">
                {comment.userType === "buyer" ? "Buyer" : "Seller"}:{" "}
                {comment.username}
              </div>
              <div className="text-sm text-gray-300 mt-2">
                Rating: {comment.rating}/5 | Date: {comment.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatOurUserSays;
