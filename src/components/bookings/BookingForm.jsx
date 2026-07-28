"use client";

import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import Button1 from "../reusable/Button1";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { createBooking } from "@/server/booking.service";
import { showToast } from "../reusable/toastAlert";
import { useRouter } from "next/navigation";
import { TbCurrencyTaka } from "react-icons/tb";
import { SelectStyles } from "../reusable/SelectStyles";
import { IoBookmarksSharp } from "react-icons/io5";

const BookingForm = ({ service }) => {
    const router = useRouter();
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingDivisions, setLoadingDivisions] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            durationType: "day",
            duration: 1,
            division: null,
            district: null,
            city: "",
            address: "",
            note: "",
        },
    });

    const selectedDivision = watch("division");
    const durationType = watch("durationType");
    const duration = watch("duration");

    // load divisions 
    useEffect(() => {
        let isMounted = true;
        const getDivisions = async () => {
            try {
                setLoadingDivisions(true);
                const { data } = await axios.get(
                    "https://bdapi.vercel.app/api/v.1/division"
                );
                if (!isMounted) return;

                const options = data.data.map((division) => ({
                    value: division.name,
                    label: division.name,
                    id: division.id,
                }));

                setDivisions(options);
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) setLoadingDivisions(false);
            }
        };
        getDivisions();
        return () => {
            isMounted = false;
        };
    }, []);

    // load districts whenever the selected division changes
    useEffect(() => {
        if (!selectedDivision) {
            setDistricts([]);
            return;
        }
        let isMounted = true;
        setValue("district", null);

        if (!selectedDivision.id) {
            return;
        }

        const getDistricts = async () => {
            try {
                setLoadingDistricts(true);
                const url = `https://bdapi.vercel.app/api/v.1/district/${selectedDivision.id}`;
                const { data } = await axios.get(url);

                if (!isMounted) return;

                if (!data?.data) {
                    setDistricts([]);
                    return;
                }
                const options = data.data.map((district) => ({
                    value: district.name,
                    label: district.name,
                }));

                setDistricts(options);
            } catch (error) {
                console.error("District fetch failed:", error);
                if (isMounted) setDistricts([]);
            } finally {
                if (isMounted) setLoadingDistricts(false);
            }
        };
        getDistricts();

        return () => {
            isMounted = false;
        };
    }, [selectedDivision, setValue]);

    // calculate total cost
    const totalCost = useMemo(() => {
        const price =
            durationType === "day" ? service.pricePerDay : service.pricePerHour;

        return (Number(duration) || 0) * price;
    }, [duration, durationType, service.pricePerDay, service.pricePerHour]);

    const onSubmit = async (data) => {

        const result = await Swal.fire({
            title: "Confirm Booking?",
            text: "Do you want to submit this booking request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#06b6d4",
        });
        if (!result.isConfirmed) return;

        const payload = {

            serviceId: service._id,
            serviceName: service.title,
            durationType: data.durationType,
            duration: Number(data.duration),
            location: {
                division: data.division.label,
                district: data.district.label,
                city: data.city,
                address: data.address,
            },
            note: data.note,
            totalCost,
        };

        const response = await createBooking(payload);
        if (response.success) {
            await showToast(
                "success",
                "Booking request submitted successfully"
            );
            router.push("/services");

        } else {
            showToast("error", response.message);
        }
    };

    return (
        <section className="min-h-screen bg-base-200 py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2">
                        <div className="border border-primary/50 rounded-3xl shadow-xl p-8">
                            <h2 className="text-3xl font-semibold mb-10">
                                Book Your  
                                <span className="text-primary"> Service</span>
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Duration Type */}
                                <div>
                                    <label className="font-medium block mb-4">
                                        Duration Type
                                    </label>

                                    <div className="grid grid-cols-2 gap-5">
                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                value="day"
                                                {...register("durationType")}
                                                className="hidden peer"
                                            />
                                            <div className="border border-accent rounded-2xl p-2 transition peer-checked:border-primary peer-checked:bg-primary/30 flex items-center justify-center gap-1">
                                                Day / <span className="text-success text-sm">{service.pricePerDay}</span> <TbCurrencyTaka className="text-success"/>
                                            </div>
                                        </label>

                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                value="hour"
                                                {...register("durationType")}
                                                className="hidden peer"
                                            />
                                            <div className="border border-accent rounded-2xl p-2 transition peer-checked:border-primary peer-checked:bg-primary/30 flex items-center justify-center gap-1">
                                                Hour / <span className="text-success text-sm">{service.pricePerHour}</span> <TbCurrencyTaka className="text-success" />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="font-medium block mb-2">
                                        Duration
                                    </label>

                                    <input
                                        type="number"
                                        min={1}
                                        {...register("duration", {
                                            required: "Duration is required",
                                            min: 1,
                                        })}
                                        className="w-full p-2 pl-4 rounded-2xl placeholder:text-base-100 border border-accent focus:outline-none focus:border-primary"
                                    />

                                    {errors.duration && (
                                        <p className="text-error mt-2">
                                            {errors.duration.message}
                                        </p>
                                    )}
                                </div>

                                {/* division */}
                                <div>
                                    <label className="font-medium block mb-2">
                                        Division
                                    </label>

                                    <Controller
                                        control={control}
                                        name="division"
                                        rules={{ required: "Division is required" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={divisions}
                                                placeholder="Select Division"
                                                isSearchable
                                                isLoading={loadingDivisions}
                                                unstyled
                                                classNames={SelectStyles}
                                                instanceId="division-select"
                                            />
                                        )}
                                    />
                                    {errors.division && (
                                        <p className="text-error mt-2">
                                            {errors.division.message}
                                        </p>
                                    )}
                                </div>

                                {/* district */}
                                <div>
                                    <label className="font-semibold block mb-2">
                                        District
                                    </label>
                                    <Controller
                                        control={control}
                                        name="district"
                                        rules={{ required: "District is required" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={districts}
                                                placeholder={selectedDivision ? "Select District" : "Select a division first"}
                                                isSearchable
                                                isLoading={loadingDistricts}
                                                isDisabled={!selectedDivision}
                                                unstyled
                                                classNames={SelectStyles}
                                                instanceId="district-select"
                                            />
                                        )}
                                    />
                                    {errors.district && (
                                        <p className="text-error mt-2">
                                            {errors.district.message}
                                        </p>
                                    )}
                                </div>

                                {/* city */}
                                <div>
                                    <label className="font-medium block mb-2">
                                        City
                                    </label>

                                    <input
                                        {...register("city", { required: true })}
                                        placeholder="Enter your city"
                                        className="w-full rounded-2xl p-2 pl-3 border border-accent focus:outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="font-medium block mb-2">
                                        Full Address
                                    </label>
                                    <textarea
                                        rows={4}
                                        {...register("address", {
                                            required: "Address is required",
                                        })}
                                        placeholder="Enter your full address"
                                        className="w-full rounded-2xl p-2 pl-3 border border-accent focus:outline-none focus:border-primary"
                                    />
                                    {errors.address && (
                                        <p className="text-error mt-2">
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>

                                {/* Note */}
                                <div>
                                    <label className="font-medium block mb-2">
                                        Special Instructions
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register("note")}
                                        placeholder="Enter additional instructions"
                                        className="w-full rounded-2xl p-2 pl-3 border border-accent focus:outline-none focus:border-primary"
                                    />
                                </div>

                                {/* Total */}
                                <div className="border border-primary/60 rounded-2xl p-4 text-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Total Cost</span>
                                        <span className="text-xl text-success font-semibold flex items-center gap-2">
                                            <TbCurrencyTaka /> {totalCost}
                                        </span>
                                    </div>
                                </div>

                                <Button1 type="submit" className="w-full flex items-center justify-center gap-2">
                                    Confirm Booking <IoBookmarksSharp />
                                </Button1>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <div className="sticky top-28 bg-base-200 rounded-2xl shadow-xl overflow-hidden border border-accent">
                            <div className="relative h-64">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-primary">{service.title}</h2>
                                <p className="text-accent mt-3">{service.description}</p>

                                <div className="divider"></div>

                                <h3 className="font-semibold mb-4">Advantages</h3>

                                <div className="space-y-3">
                                    {service.advantages.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="text-primary mt-1" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider"></div>

                                <h3 className="font-semibold mb-4">Pricing -</h3>

                                <div className="space-y-3 text-success">
                                    <div className="flex justify-between">
                                        <span>Per Hour</span>
                                        <span className="font-semibold">
                                            {service.pricePerHour} Tk
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Per Day</span>
                                        <span className="font-semibold">
                                            {service.pricePerDay} Tk
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;