import { adminAllBookings } from '@/server/booking.service';
import React from 'react';
import AdminAllBookingsTable from './_components/adminAllBookingsTable';

const page = async () => {
    const result = await adminAllBookings();
    const allBookings = JSON.parse(JSON.stringify(result.data));
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-semibold text-base-content">
                    All <span className="text-primary">Bookings</span>
                </h1>
                <p className="mt-2 text-accent">
                    View and manage all pending service bookings.
                </p>
            </div>

            <AdminAllBookingsTable bookings={allBookings} />
        </div>
    );
};

export default page;