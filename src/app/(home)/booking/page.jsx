import BookingForm from "@/components/bookings/BookingForm";
import { getSingleService } from "@/server/service.service";

const BookingPage = async ({ searchParams }) => {
    const { slug } = await searchParams;
    const service = await getSingleService(slug);

    return (
        <BookingForm service={service} />
    );
};

export default BookingPage;