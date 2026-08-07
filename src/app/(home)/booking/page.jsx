import { getSingleService } from "@/server/service.service";
import BookingForm from "./_components/BookingForm";

const BookingPage = async ({ searchParams }) => {
    const { slug } = await searchParams;
    const service = await getSingleService(slug);

    return (
        <BookingForm service={service} />
    );
};

export default BookingPage;