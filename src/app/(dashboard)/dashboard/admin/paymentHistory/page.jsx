import { adminAllPayments } from '@/server/payments.service';
import React from 'react';
import PaymentHistoryTable from './_components/PaymentHistoryTable';

const page = async () => {
    const result = await adminAllPayments();
    const payments = JSON.parse(JSON.stringify(result.data));
    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Payment <span className="text-primary">History</span>
          </h1>

          <p className="mt-2 text-sm text-accent">
            View and manage all payment transactions made through care.io.
          </p>
        </div>

        <PaymentHistoryTable payments={payments} />
      </div>
);
};

export default page;