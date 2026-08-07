import { getAllUsers, getCurrentUser } from '@/server/user.service';
import React from 'react';
import AllUsersTable from './_components/allUsersTable';

const Patients = async () => {
    const result = await getAllUsers();
    const currentUser = await getCurrentUser();
    const users = JSON.parse(JSON.stringify(result.data));
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-semibold text-base-content">
                    All <span className="text-primary">Users</span>
                </h1>
                <p className="mt-2 text-accent">
                    View and manage all registered users.
                </p>
            </div>
            <AllUsersTable
                users={users}
                currentUser={currentUser}
            />
        </div>
    );
};

export default Patients;