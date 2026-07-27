import ServiceOverview from '@/components/reusable/ServiceOverview';
import { getServices } from '@/server/service.service';
import React from 'react';

const Service = async () => {
    const services = await getServices();
    return (
        <div>
            <ServiceOverview services={services} />
        </div>
    );
};

export default Service;