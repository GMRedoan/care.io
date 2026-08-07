"use client";

import { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/server/user.service";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage";
import { showToast } from "@/components/reusable/toastAlert";
import { FiCamera } from "react-icons/fi";
import Button2 from "@/components/reusable/Button2";
import { useSession } from "next-auth/react";

const EditProfileModal = ({ user, dialogRef }) => {
    const {update} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(user.image);
    const [imageFile, setImageFile] = useState(null);
    const closeModal = () => dialogRef.current.close();
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const form = e.target;
            let image = user.image;
            if (imageFile) {
                image = await uploadImage(imageFile);
            }
            const payload = {
                name: form.name.value,
                contact: form.contact.value,
                nid: form.nid.value,
                image,
            };

            const result = await updateUser(payload);
            if (result.success) {
                showToast("success", result.message);
                closeModal();

                // refresh page
                await update();
                router.refresh();
            } else {
                showToast("error", result.message);
            }
        } catch (err) {
            showToast("error", err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <dialog ref={dialogRef} className="modal backdrop-blur-xs">
                <div className="modal-box max-w-2xl bg-base-200 border border-accent rounded-2xl">

                    <h3 className="font-semibold text-2xl mb-6">
                        Edit <span className="text-primary">Profile</span>
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="flex justify-center mb-6">
                            <div className="relative">

                                {/* Avatar */}
                                <div className="avatar">
                                    <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                        <Image
                                            src={preview}
                                            alt="Profile"
                                            width={120}
                                            height={120}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImage}
                                />

                                {/* Edit Button */}
                                <label
                                    htmlFor="profile-image"
                                    className="absolute bottom-1 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105 hover:bg-primary/90"
                                >
                                    <FiCamera size={18} />
                                </label>

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="form-control">
                                <label className="label">
                                    <span>Name</span>
                                </label>

                                <input
                                    name="name"
                                    defaultValue={user.name}
                                    className="input bg-base-200 focus:border-primary focus:outline-none rounded-2xl"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span>Email</span>
                                </label>

                                <input
                                    value={user.email}
                                    readOnly
                                    className="input bg-base-200 focus:border-primary focus:outline-none rounded-2xl"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span>Phone</span>
                                </label>

                                <input
                                    name="contact"
                                    defaultValue={user.contact}
                                    className="input bg-base-200 focus:border-primary focus:outline-none rounded-2xl"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span>NID</span>
                                </label>

                                <input
                                    name="nid"
                                    defaultValue={user.nid}
                                    className="input bg-base-200 focus:border-primary focus:outline-none rounded-2xl"
                                />
                            </div>

                        </div>

                        <div className="modal-action">

                            <button
                                type="button"
                                className="btn btn-error text-white rounded-2xl"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                            <Button2
                                className="btn rounded-2xl"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button2>
                        </div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default EditProfileModal;