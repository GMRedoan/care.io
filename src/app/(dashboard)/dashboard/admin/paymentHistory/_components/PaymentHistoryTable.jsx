"use client";

import Animate from "@/components/reusable/Animate";
import Pagination from "@/components/shared/Pagination";
import React, { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaReceipt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const PaymentHistoryTable = ({ payments }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPayments = useMemo(() => {
  const searchValue = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !searchValue ||
        payment.userName?.toLowerCase().includes(searchValue) ||
        payment.userEmail?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  // pagination
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredPayments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPayments, currentPage]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-accent" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-accent/20 bg-base-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm text-accent" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-sm rounded-xl border-accent/20 bg-base-200 text-sm focus:border-primary focus:outline-none"
          >
            <option value="all">All Payments</option>

            <option value="paid">Paid</option>

            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Result information */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-accent">
          Showing{" "}
          <span className="font-medium text-base-content">
            {filteredPayments.length}
          </span>{" "}
          {filteredPayments.length === 1 ? "payment" : "payments"}
        </p>

        {(search || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="text-xs text-primary cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>
      {
        paginatedPayments.length === 0 ? (      <div className="rounded-2xl border border-accent/10 bg-base-200 py-20 text-center shadow-sm">
        <FaReceipt className="mx-auto mb-4 text-3xl text-accent/40" />

        <h2 className="font-medium">No payment history found</h2>

        <p className="mt-1 text-sm text-accent">
          Payment transactions will appear here.
        </p>
      </div>
) : 
        (      <Animate className="overflow-x-auto rounded-2xl border-x border-accent/70 shadow-sm">
        <table className="table table-zebra">
          <thead className="text-primary bg-base-100">
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Paid On</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPayments.map((payment, index) => (
              <tr key={payment._id}>
                {/* No */}
                <td className="font-medium">{index + 1}</td>

                {/* Customer */}
                <td>
                  <div>
                    <p className="font-semibold">{payment.userName}</p>

                    <p className="text-xs text-accent">{payment.userEmail}</p>
                  </div>
                </td>

                {/* Service */}
                <td>
                  <span className="font-medium">{payment.serviceName}</span>
                </td>

                {/* Amount */}
                <td>
                  <span className="font-semibold text-success">
                    ৳ {Number(payment.amount || 0).toLocaleString()}
                  </span>
                </td>

                {/* Payment Method */}
                <td>
                  <span className="badge badge-outline capitalize">
                    {payment.paymentMethod}
                  </span>
                </td>

                {/* Transaction ID */}
                <td>
                  <span className="font-mono text-xs text-accent">
                    {payment.transactionId}
                  </span>
                </td>

                {/* Status */}
                <td>
                  {payment.status === "paid" && (
                    <span className="badge badge-success gap-1 py-3 text-white">
                      <FaCheckCircle />
                      Paid
                    </span>
                  )}

                  {payment.status === "pending" && (
                    <span className="badge badge-warning gap-1 py-3 text-white">
                      <FaClock />
                      Pending
                    </span>
                  )}

                  {payment.status === "failed" && (
                    <span className="badge badge-error gap-1 py-3 text-white">
                      <FaTimesCircle />
                      Failed
                    </span>
                  )}
                </td>

                {/* Date */}
                <td>
                  <span className="text-sm text-accent">
                    {new Date(payment.createdAt).toLocaleDateString("en-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Animate>
)
      }

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default PaymentHistoryTable;
