import { getServices } from "@/server/service.service";
import ServiceOverview from "../reusable/ServiceOverview";

const Services = async () => {
    const services = await getServices();
    return (
        <div>
            <ServiceOverview services={services} />
        </div>
    );
};

export default Services;