import { getAllUsers } from "@/server/user.service";
import { adminAllBookings } from "@/server/booking.service";
import { adminAllReview } from "@/server/review.service";
import AdminDashboard from "./_components/AdminDashboard";
import { adminAllPayments } from "@/server/payments.service";


const Page = async () => {
  const [usersResult, bookingsResult, paymentsResult, reviewsResult] =
    await Promise.all([
      getAllUsers(),
      adminAllBookings(),
      adminAllPayments(),
      adminAllReview(),
    ]);

  const users = JSON.parse(JSON.stringify(usersResult.data));
  const bookings = JSON.parse(JSON.stringify(bookingsResult.data));
  const payments =  JSON.parse(JSON.stringify(paymentsResult.data));
  const reviews = JSON.parse(JSON.stringify(reviewsResult.data));

  // Booking statistics
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "rejected",
  ).length;

   // Payment statistics
  const paidPayments = payments.filter(
    (payment) => payment.status === "paid",
  ).length;

  const unpaidPayments = payments.filter(
    (payment) => payment.status !== "paid",
  ).length;

  // Total payment
  const totalPayments = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount || payment.totalCost || 0),
    0,
  );

  // Average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + Number(review.rating || 0),
            0,
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  // Recent bookings
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Dashboard data
  const dashboardData = {
    stats: {
      totalUsers: users.length,
      totalBookings: bookings.length,
      pendingBookings,
      approvedBookings,
      totalPayments,
      totalReviews: reviews.length,
      averageRating,
    },

    bookingStats: [
      {
        name: "Pending",
        value: pendingBookings,
      },
      {
        name: "Approved",
        value: approvedBookings,
      },
      {
        name: "Cancelled",
        value: cancelledBookings,
      },
    ],

    paymentStats: [
      {
        name: "Paid",
        value: paidPayments,
      },
      {
        name: "Unpaid",
        value: unpaidPayments,
      },
    ],

    recentBookings,
  };

  return <AdminDashboard data={dashboardData} />;
};

export default Page;
