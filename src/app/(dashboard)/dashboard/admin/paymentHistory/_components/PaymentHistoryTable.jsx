"use client";

import Animate from "@/components/reusable/Animate";
import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaReceipt,
} from "react-icons/fa";

const PaymentHistoryTable = ({ payments }) => {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-accent/10 bg-base-200 py-20 text-center shadow-sm">
        <FaReceipt className="mx-auto mb-4 text-3xl text-accent/40" />

        <h2 className="font-medium">No payment history found</h2>

        <p className="mt-1 text-sm text-accent">
          Payment transactions will appear here.
        </p>
      </div>
    );
  }

  return (
    <Animate className="overflow-x-auto rounded-2xl border-x border-accent/70 shadow-sm">
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
          {payments.map((payment, index) => (
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
  );
};

export default PaymentHistoryTable;
