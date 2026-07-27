import Image from "next/image";
import Link from "next/link";
import { GrCheckmark } from "react-icons/gr";
import { FaCalendarCheck, FaChevronDown, FaTicketAlt } from "react-icons/fa";
import Animate from "@/components/reusable/Animate";
import { getSingleService } from "@/server/service.service";

const PerforatedDivider = ({ tone = "base-100" }) => (
    <div className={`relative h-8 bg-${tone} overflow-hidden`}>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-base-300/70" />
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-base-200" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-base-200" />
    </div>
);

const ServiceDetails = async ({ params }) => {
    const { slug } = await params;

    const service = await getSingleService(slug);

    const serial = String(service._id ?? slug ?? "000000")
        .slice(-6)
        .toUpperCase();

    return (
        <main className="bg-base-200">

            <style>{`html { scroll-behavior: smooth; }`}</style>
        {/* Banner */}
            <section className="fixed inset-0 w-full overflow-hidden bg-black z-10 mt-16">

                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
                <div className="absolute inset-0 bg-linear-to-tr from-cyan-950/40 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Animate type="fade" className="text-center px-6 max-w-4xl">

                        <div className="flex items-center justify-center gap-3 mb-6 text-cyan-300/90">
                            <FaTicketAlt className="text-sm" />
                            <span className="uppercase tracking-[0.3em] text-xs font-semibold">
                                Service&nbsp;No. {serial}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                            {service.title}
                        </h1>

                        <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                            {service.description}
                        </p>

                    </Animate>

                    <a
                        href="#about"
                        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition"
                    >
                        <span className="text-[10px] uppercase tracking-[0.25em]">Details</span>
                        <FaChevronDown className="animate-bounce text-sm" />
                    </a>
                </div>

            </section>

            <div className="h-screen" aria-hidden="true" />

            <div className="relative z-10 bg-base-200">

                <PerforatedDivider tone="base-200" />

                {/* Sticky ticket-stub nav — glass strip echoing a boarding-pass header row */}
                <div className="sticky top-0 z-40 backdrop-blur bg-base-200/80 border-b border-base-300/60">
                    <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
                        <div className="flex gap-6 font-medium">
                            <a href="#about" className="hover:text-cyan-500 transition">About</a>
                            <a href="#gallery" className="hover:text-cyan-500 transition">Gallery</a>
                            <a href="#advantages" className="hover:text-cyan-500 transition">Why Us</a>
                        </div>
                        <span className="hidden sm:inline font-mono text-xs text-accent/70 tracking-widest">
                            FILE / {serial}
                        </span>
                    </nav>
                </div>

                {/* Details */}
                <section id="about" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">

                    <Animate>

                        <div className="grid md:grid-cols-2 gap-12 items-center">

                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-600 mb-3">
                                    Details — Service File
                                </p>

                                <h2 className="text-4xl font-bold mb-6">
                                    About Our Service
                                </h2>

                                <p className="text-accent leading-relaxed text-lg">
                                    {service.details}
                                </p>
                            </div>

                            <div className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-xl">
                                    <Image
                                        src={service.images[1]}
                                        alt="service"
                                        width={700}
                                        height={500}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* rotated stamp — a nod to a ticket's authenticity seal */}
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-base-100 border-2 border-dashed border-cyan-500/60 flex items-center justify-center rotate-[-12deg] shadow-lg">
                                    <GrCheckmark className="text-cyan-500 text-2xl" />
                                </div>
                            </div>

                        </div>

                    </Animate>

                </section>

                <PerforatedDivider tone="base-200" />

                {/* Gallery */}
                <section id="gallery" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">

                    <Animate type="zoom">

                        <h2 className="text-4xl font-bold mb-10 text-center">
                            Service Gallery
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">

                            {
                                service.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative h-80 rounded-3xl overflow-hidden group"
                                    >

                                        <Image
                                            src={img}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        {/* frame index — a real sequence, so numbering earns its place here */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-5">
                                            <span className="font-mono text-white text-sm tracking-widest">
                                                {String(index + 1).padStart(2, "0")} / {String(service.images.length).padStart(2, "0")}
                                            </span>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </Animate>

                </section>

                <PerforatedDivider tone="base-200" />

                {/* Advantages */}
                <section id="advantages" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">

                    <Animate>

                        <h2 className="text-4xl font-bold text-center mb-12">
                            Why Choose Us?
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                            {
                                service.advantages.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`
                                    relative
                                    bg-base-100
                                    rounded-2xl
                                    p-8
                                    shadow-lg
                                    border
                                    border-dashed
                                    border-base-300
                                    hover:-translate-y-2
                                    hover:rotate-0
                                    transition
                                    duration-300
                                    ${index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"}
                                    `}
                                    >
                                        {/* punched notches, top and bottom, to sell the ticket-stub shape */}
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-base-200" />
                                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-base-200" />

                                        <GrCheckmark className="text-cyan-500 text-3xl mb-5" />

                                        <p className="font-semibold">
                                            {item}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>

                    </Animate>

                </section>

            </div>
            {/* end opaque scrolling-content wrapper */}

            {/* Floating Book Button */}
            <Link
                href={`/booking?serviceId=${service._id}`}
                className="fixed bottom-7 right-22 z-50"
            >
                <div className="relative flex items-center justify-center">

                    {/* orbiting dashed ring — the same "ticket" language as the hero eyebrow,
                        now closing the loop at the page's one real action */}
                    <svg
                        viewBox="0 0 120 120"
                        className="absolute w-28 h-28 animate-spin-slow pointer-events-none"
                    >
                        <circle
                            cx="60" cy="60" r="55"
                            fill="none"
                            stroke="currentColor"
                            className="text-cyan-500/40"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                        />
                    </svg>

                    <button
                        className="
                        relative
                        flex
                        items-center
                        gap-3
                        px-7
                        py-4
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        text-white
                        font-bold
                        shadow-2xl
                        hover:scale-105
                        transition
                        "
                    >
                        <FaCalendarCheck />
                        Book Service
                    </button>
                </div>
            </Link>

        </main>
    );
};

export default ServiceDetails;