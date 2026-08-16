"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button1 from "@/components/reusable/Button1";
import { MdArrowOutward } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import Animate from "@/components/reusable/Animate";

const blogs = [
    {
        title: "How to Choose the Right Caregiver for Your Family",
        desc: "A complete guide to selecting trusted and verified caregivers with confidence.",
        image: "https://i.ibb.co.com/gFLHjWJq/c4.jpg",
        category: "Family Care",
    },
    {
        title: "5 Signs Your Elderly Parent Needs Extra Support",
        desc: "Understanding when professional elderly care becomes essential.",
        image: "https://i.ibb.co.com/bj4FJsB6/zan-lazarevic-f-YTf-Oza-RVWw-unsplash.jpg",
        category: "Elderly Care",
    },
    {
        title: "Creating a Safe Home Environment for Children",
        desc: "Simple steps to ensure your child’s safety and comfort at home.",
        image: "https://i.ibb.co.com/0jWgVfdp/jametlene-reskp-6ht4-XYJ6shk-unsplash.jpg",
        category: "Baby Care",
    },
];

export default function Blog() {
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        Swal.fire({
            title: "Thank You",
            text: "Successfully Subscribed !",
            icon: "success",
            confirmButtonColor: "#11B2ED"
        });
        form.reset()
    }
    return (
        <div className="bg-base-200">

            {/* HERO SECTION */}
            <Animate className="relative py-28 px-6 md:px-16 text-center overflow-hidden">
                <div className="absolute -top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

                <h1 className="text-3xl md:text-5xl font-extrabold 
          bg-linear-to-r from-base-300 via-cyan-400 to-base-300 
          bg-clip-text text-transparent">
                    Care Insights & Family Stories
                </h1>

                <p className="mt-6 text-accent max-w-2xl mx-auto text-xl">
                    Expert advice, caregiving tips, and real-life experiences
                    to help families make informed decisions.
                </p>
            </Animate>


            {/* FEATURED BLOG */}
            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <Animate type="fadeLeft" className="relative h-100 rounded-3xl overflow-hidden group">
                        <Image
                            src="https://i.ibb.co.com/gM48zk0r/c2.jpg"
                            alt="Featured Blog"
                            fill
                            className="object-cover"
                        />
                    </Animate>

                    <Animate type="fadeRight">
                        <span className="text-primary font-semibold uppercase text-sm ml-4">
                            Featured Article
                        </span>
                        <p className="border-b-2 border-base-300 w-24" />

                        <h2 className="text-2xl md:text-3xl font-bold mt-4 leading-snug">
                            Why Trusted <span className="text-primary">Care</span> Matters More Than Ever Today
                        </h2>

                        <p className="mt-6 text-accent leading-relaxed">
                            In today’s fast-paced world, families need reliable and
                            secure caregiving solutions. Learn how modern platforms
                            are transforming family care services.
                        </p>
 
                        <Button1
                            className="mt-8 inline-flex items-center gap-2 font-semibold 
                                   px-6 py-3 rounded-xl transition duration-300"
                            onClick={() => document.getElementById('open').showModal()}>Read Full Article < MdArrowOutward size={18} />
                        </Button1>

                        {/* modal */}

                        <dialog id="open" className="modal">
                            <div className="modal-box max-w-4xl w-full">
                                <form method="dialog">
                                    <button className="btn btn-circle btn-ghost absolute right-12 top-16 text-3xl text-red-600"><IoClose /></button>
                                </form>
                                <div className="p-10">
                                    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-base-300
                                    relative inline-block">

                                        Why Trusted <span className="text-primary">Care.io</span>

                                        <span className="absolute left-0 -bottom-4 w-60 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full">
                                        </span>
                                    </h2>

                                    <p className="mt-10 text-accent text-lg leading-relaxed space-y-6">

                                        In today’s fast-paced and demanding world, families are constantly
                                        balancing careers, responsibilities, and personal commitments.
                                        Amid this busy lifestyle, ensuring proper care for children,
                                        elderly parents, or sick family members can become overwhelming.
                                        This is where trusted caregiving services play a crucial role.

                                        <br /><br />

                                        Reliable care is not just about assistance — it is about safety,
                                        compassion, and peace of mind. Families need to know that their
                                        loved ones are in capable hands, supported by professionals who
                                        are not only skilled but also genuinely caring. Trust becomes
                                        the foundation of every caregiving relationship.

                                        <br /><br />

                                        Modern caregiving platforms are transforming how families connect
                                        with caregivers. Through verified profiles, background checks,
                                        secure communication systems, and transparent reviews, families
                                        can confidently choose the right support tailored to their needs.
                                        Technology has made it easier than ever to access care that is
                                        both convenient and dependable.

                                        <br /><br />

                                        For children, trusted care ensures emotional development,
                                        safety, and nurturing support. For elderly family members,
                                        it provides dignity, companionship, and daily assistance.
                                        For individuals recovering from illness, it offers comfort,
                                        medical awareness, and structured recovery support.

                                        <br /><br />

                                        Ultimately, trusted care matters more than ever because families
                                        deserve reassurance in uncertain times. With the right platform
                                        and verified caregivers, caregiving becomes simpler, more secure,
                                        and accessible to everyone — creating a future where no family
                                        feels alone in providing the care their loved ones deserve.

                                    </p>

                                </div>
                            </div>
                        </dialog>

                        <div className="absolute -bottom-20 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
                    </Animate>
                </div>
            </section>


            {/* CATEGORY Title*/}
            <div className="border-t border-accent pb-20 max-w-5xl mx-auto animate-pulse" />

            {/* BLOG GRID (Masonry Style Feel) */}
            <Animate className="px-6 md:px-16 pb-28">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {blogs.map((blog, index) => (
                        <div key={index}
                            className="group rounded-3xl overflow-hidden 
              shadow-xl hover:-translate-y-2 transition duration-500">

                            <div className="relative h-62.5 overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6 bg-base-200 border-b border-primary">

                                <span className="text-cyan-500 text-xs font-semibold uppercase">
                                    {blog.category}
                                </span>

                                <h3 className="text-xl font-bold mt-3 transition">
                                    {blog.title}
                                </h3>

                                <p className="text-accent text-sm mt-3 leading-relaxed">
                                    {blog.desc}
                                </p>

                                <Button1
                                    className="mt-3"
                                    onClick={() => document.getElementById('open').showModal()}
                                    href="#">
                                    <div className="px-2 flex items-center gap-2 font-semibold text-sm ">
                                        Read More <FaArrowRight />
                                    </div>
                                </Button1>
                            </div>
                        </div>
                    ))}

                </div>
            </Animate>


            {/* NEWSLETTER CTA */}
            <section className="py-14 px-6 md:px-16 text-center text-white">

                <h3 className="text-3xl md:text-4xl font-bold text-base-300">
                    Stay Updated with <span className="text-primary">Care.io</span>
                </h3>

                <p className="mt-4 max-w-2xl mx-auto text-accent">
                    Subscribe to receive helpful caregiving advice and
                    family wellness updates directly to your inbox.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            required
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-xl border border-primary text-base-300 w-full sm:w-80"
                        />
                        <span type="submit">
                            <Button1 className="px-8 py-4 font-semibold transition">
                                Subscribe
                            </Button1>
                        </span>
                    </div>
                </form>
            </section>

        </div>
    );
}