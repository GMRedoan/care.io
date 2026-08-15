import { myReviews } from '@/server/review.service';
import React from 'react';
import ReviewManager from './_components/ReviewManager';

const page = async () => {
    const result = await myReviews();
    const reviews = JSON.parse(JSON.stringify(result.data));
    return (
        <>
        <ReviewManager reviews={reviews} />
        </>
    );
};

export default page;