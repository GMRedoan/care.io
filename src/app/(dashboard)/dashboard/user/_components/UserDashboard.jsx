"use client";

import StatsCard from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaMoneyBillWave,
  FaSearch,
  FaCreditCard,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import Button1 from "@/components/reusable/Button1";
import Button2 from "@/components/reusable/Button2";
import Animate from "@/components/reusable/Animate";
import MyBookingsTable from "../myBookings/_components/myBookingsTable";

const UserDashboard = ({ bookings = [], payments = [], reviews = [], user }) => {
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved",
  ).length;
  const totalSpent = payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);
  const recentBookings = bookings.slice(0, 4);
  const bookingStats = [
    {
      name: "Pending",
      value: pendingBookings,
    },
    {
      name: "Approved",
      value: approvedBookings,
    },
    {
      name: "Rejected",
      value: bookings.filter((booking) => booking.status === "rejected").length,
    },
  ];

  const bookingColors = [
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="space-y-14 py-10">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome back, <span className="text-primary">{user.name}</span> 👋
        </h1>

        <p className="mt-2 text-sm text-accent">
          Manage your bookings, payments, and reviews from your dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          description="All your bookings"
          icon={FaCalendarCheck}
        />

        <StatsCard
          title="Pending"
          value={pendingBookings}
          description="Waiting for approval"
          icon={FaClock}
          color="warning"
        />

        <StatsCard
          title="Approved"
          value={approvedBookings}
          description="Approved bookings"
          icon={FaCheckCircle}
          color="success"
        />

        <StatsCard
          title="Total Spent"
          value={`৳ ${totalSpent.toLocaleString()}`}
          description="Successful payments"
          icon={FaMoneyBillWave}
          color="success"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Booking Statistics */}
        <Animate
          type="fadeLeft"
          className="rounded-2xl border border-accent/40 bg-base-200 p-5 shadow-sm xl:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Booking <span className="text-primary">Statistics</span>
              </h2>

              <p className="mt-1 text-sm text-accent">
                Overview of your booking status
              </p>
            </div>

            <Button2>
              <Link
                href="/dashboard/user/myBookings"
                className="text-sm text-primary p-2 hover:text-white duration-500 flex items-center gap-2"
              >
                View all <FaArrowRight size={10} />
              </Link>
            </Button2>
          </div>

          <div className="mt-4 h-72">
            {bookingStats.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium">No booking data yet</p>

                  <p className="mt-1 text-xs text-accent">
                    Your booking statistics will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {bookingStats.map((entry, index) => (
                      <Cell
                        key={`booking-${index}`}
                        fill={bookingColors[index % bookingColors.length]}
                      />
                    ))}
                  </Pie>

                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-base-content">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Animate>

        {/* Reviews CTA */}
        <Animate type="fadeRight" className="rounded-2xl bg-primary/80 p-6 shadow-sm">
          <div className="flex gap-3">
            <FaStar className="text-2xl text-warning" />
            <FaStar className="text-2xl text-warning" />
            <FaStar className="text-2xl text-warning" />
            <FaStar className="text-2xl text-warning animate-pulse" />
            <FaStar className="text-2xl text-warning animate-pulse" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">Your Reviews</h2>

          <p className="mt-2 text-sm opacity-80">
            You have shared {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"} with Care Io.
          </p>

          <Link
            href="/dashboard/user/reviews"
            className="group btn mt-6 border-0 bg-white text-primary hover:bg-white/90 rounded-xl"
          >
            Manage Reviews
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Animate>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent <span className="text-primary">Bookings</span></h2>

            <p className="mt-1 text-sm text-accent">
              Your latest service bookings
            </p>
          </div>

          <Button1>
            <Link
              href="/dashboard/user/myBookings"
              className="flex items-center gap-2"
            >
              View all <FaArrowRight size={10} />
            </Link>
          </Button1>
        </div>
        <MyBookingsTable bookings={recentBookings} />
      </div>

      {/* Bottom CTA Cards */}
      <Animate type="zoom" className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link
          href="/services"
          className="group rounded-2xl border border-primary/10 bg-primary/5 p-6 transition hover:border-primary/30 hover:shadow-sm"
        >
          <FaSearch className="text-2xl text-primary" />

          <h3 className="mt-4 font-semibold">Need a Care Service?</h3>

          <p className="mt-1 text-sm text-accent">
            Explore our available services and find the right care for your
            needs.
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Browse Services
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/dashboard/user/paymentHistory"
          className="group rounded-2xl border border-success/10 bg-success/5 p-6 transition hover:border-success/30 hover:shadow-sm"
        >
          <FaCreditCard className="text-2xl text-success" />

          <h3 className="mt-4 font-semibold">Payment History</h3>

          <p className="mt-1 text-sm text-accent">
            Keep track of your successful payments and transactions.
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-success">
            View Payments
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </span>
        </Link>
      </Animate>
    </div>
  );
};

export default UserDashboard;
