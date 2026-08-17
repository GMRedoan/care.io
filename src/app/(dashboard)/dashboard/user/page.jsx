import { getBookings } from "@/server/booking.service";
import { myPaymentHistory } from "@/server/payments.service";
import { myReviews } from "@/server/review.service";
import React from "react";
import UserDashboard from "./_components/UserDashboard";
import { getCurrentUser } from "@/server/user.service";

export const metadata = {
  title: "Dashboard | Care Io",
  description: "Manage your bookings, payments and reviews.",
};

const Page = async () => {
  const [bookingResult, paymentResult, reviewResult, user] = await Promise.all([
    getBookings(),
    myPaymentHistory(),
    myReviews(),
    getCurrentUser(),
  ]);

  const bookings = bookingResult.success
    ? JSON.parse(JSON.stringify(bookingResult.data))
    : [];

  const payments = paymentResult.success
    ? JSON.parse(JSON.stringify(paymentResult.data))
    : [];

  const reviews = reviewResult.success
    ? JSON.parse(JSON.stringify(reviewResult.data))
    : [];

  return (
    <UserDashboard bookings={bookings} payments={payments} reviews={reviews} user={user}/>
  );
};

export default Page;