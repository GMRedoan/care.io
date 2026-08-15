"use client"

import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewManager = ({reviews}) => {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            My <span className="text-primary">Reviews</span>
          </h1>
          <p className="mt-2 text-sm text-accent">
            Share your experience, manage your feedback, and keep track of the
            reviews you&apos;ve shared.
          </p>
        </div>

        {reviews.length === 0 ? (
          <h2 className="text-center py-50 font-medium text-sm text-accent">
            No reviews found. please add your first review <br/> from service details.
          </h2>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onUpdate={(review) => console.log("Update:", review)}
                onDelete={(review) => console.log("Delete:", review)}
              />
            ))}
          </div>
        )}
      </div>
    );
};

export default ReviewManager;