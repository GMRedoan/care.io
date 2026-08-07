"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiEdit2, FiUser, FiMail, FiPhone, FiCreditCard, FiShield } from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";
import Animate from "@/components/reusable/Animate";
import Button1 from "@/components/reusable/Button1";

const ProfileCard = ({ user }) => {
    const dialogRef = useRef(null);
    return (
        <Animate type="zoom" className="card bg-base-200 shadow-xl border border-accent rounded-2xl">
            <Animate className="card-body py-10">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                    </div>

                    <Button1
                        className="flex items-center gap-2"
                        onClick={() => dialogRef.current.showModal()}
                    >
                        <FiEdit2 />
                        Edit Profile
                    </Button1>
                </div>

                {/* User Info */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                    {/* Avatar */}
                    <div className="avatar">
                        <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <Image
                                src={user?.image}
                                alt={user.name}
                                width={144}
                                height={144}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="flex items-center gap-3">
                            <FiUser className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-base-content/60">Full Name</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiMail className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-base-content/60">Email</p>
                                <p className="font-semibold break-all">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiPhone className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-base-content/60">Phone</p>
                                <p className="font-semibold">
                                    {user.contact || "Not Added"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiCreditCard className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-base-content/60">NID Number</p>
                                <p className="font-semibold">
                                    {user.nid || "Not Added"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiShield className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-base-content/60">Role</p>

                                <span className="badge badge-primary capitalize">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </Animate>
            <EditProfileModal
                user={user}
                dialogRef={dialogRef}
            />
        </Animate>
    );
};

export default ProfileCard;