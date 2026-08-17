"use client";

import StatsCard from "@/components/dashboard/StatCard";
import Animate from "@/components/reusable/Animate";
import {
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";
import AdminAllBookingTable from "../allBookings/_components/adminAllBookingsTable";
import Button1 from "@/components/reusable/Button1";
import { MdViewCarousel } from "react-icons/md";
import { useRouter } from "next/navigation";

const bookingColors = ["#f59e0b", "#22c55e", "#ef4444"];
const paymentColors = {
  Paid: "#22c55e",
  Unpaid: "#f59e0b",
};

const AdminDashboard = ({ data }) => {
    const router = useRouter();
  const { stats, bookingStats, paymentStats, recentBookings } = data;

  return (
    <div className="space-y-16 my-10">
      {/* ================= Welcome ================= */}
      <section>
        <h1 className="text-3xl font-semibold">
          Welcome back, <span className="text-primary">Admin!</span>
        </h1>

        <p className="mt-2 text-sm text-accent">
          Here&apos;s an overview of what&apos;s happening with care.io today.
        </p>
      </section>

      {/* ================= Stats ================= */}
      <div className="grid gap-5 grid-cols-2 md:grid-cols-5">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers || 0}
          description="Registered users"
          icon={FaUsers}
          color="primary"
        />

        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings || 0}
          description="All service bookings"
          icon={FaCalendarCheck}
          color="info"
        />

        <StatsCard
          title="Pending"
          value={stats.pendingBookings || 0}
          description="Awaiting approval"
          icon={FaClock}
          color="warning"
        />

        <StatsCard
          title="Approved"
          value={stats.approvedBookings || 0}
          description="Approved bookings"
          icon={FaCheckCircle}
          color="success"
        />

        <StatsCard
          title="Payments"
          value={`৳ ${Number(stats.totalPayments || 0).toLocaleString()}`}
          description="Total collected"
          icon={FaMoneyBillWave}
          color="success"
        />
      </div>

      {/* ================= Charts ================= */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Booking Chart */}
        <Animate
          type="fadeLeft"
          className="rounded-2xl border border-accent/50 bg-base-200 p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Booking <span className="text-primary">Overview</span>
            </h2>

            <p className="mt-1 text-xs text-accent">
              Current booking status distribution
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={55}
                  paddingAngle={3}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {bookingStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={bookingColors[index % bookingColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>{" "}
        </Animate>

        {/* Payment Chart */}
        <Animate
          type="fadeRight"
          className="rounded-2xl border border-accent/50 bg-base-200 p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Payment <span className="text-primary">Overview</span>
            </h2>

            <p className="mt-1 text-xs text-accent">
              Paid and unpaid booking statistics
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentStats}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.08}
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={90}>
                  {paymentStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={paymentColors[entry.name] || "#22c55e"}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    className="fill-base-content text-xs font-semibold"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>{" "}
        </Animate>
      </section>

      {/* ================= Recent Bookings ================= */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Recent <span className="text-primary">Bookings</span>
            </h2>

            <p className="mt-1 text-xs text-accent">
              Latest 5 service bookings
            </p>
          </div>
          <Button1
            onClick={() => router.push("/dashboard/admin/allBookings")}
            className="flex items-center gap-2"
          >
            View All <MdViewCarousel className="text-lg animate-pulse" />
          </Button1>
        </div>
        <AdminAllBookingTable bookings={recentBookings} />
      </section>

      {/* ================= Footer Cards ================= */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Animate type="zoom" className="rounded-2xl border border-primary/40 hover:border-primary duration-300 bg-base-200 p-6 text-primary-content">
          <h3 className="font-semibold">Booking Success</h3>

          <p className="mt-2 text-3xl font-semibold text-primary">
            {stats.totalBookings
              ? Math.round((stats.approvedBookings / stats.totalBookings) * 100)
              : 0}
            %
          </p>

          <p className="mt-2 text-sm opacity-80">
            Of bookings have been approved.
          </p>
        </Animate>

        <Animate type="zoom" className="rounded-2xl border border-accent/40 bg-base-200 p-6">
          <p className="text-md">Average Rating</p>

          <h3 className="mt-2 text-3xl font-semibold">
            {stats.averageRating || "0.0"}
            <span className="ml-1 text-base text-warning">★</span>
          </h3>

          <p className="mt-2 text-sm text-accent">Based on customer reviews</p>
        </Animate>

        <Animate type="zoom" className="rounded-2xl border border-accent/40 bg-base-200 p-6">
          <p className="text-md">Total Reviews</p>

          <h3 className="mt-2 text-3xl font-semibold">{stats.totalReviews || 0}</h3>
          <p className="mt-2 text-sm text-accent">Customer feedback received</p>
        </Animate>
      </section>
    </div>
  );
};

export default AdminDashboard;
