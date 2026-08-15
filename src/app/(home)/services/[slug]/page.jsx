import Image from "next/image";
import Link from "next/link";
import { GrCheckmark } from "react-icons/gr";
import { FaCalendarCheck, FaChevronDown, FaTicketAlt } from "react-icons/fa";
import Animate from "@/components/reusable/Animate";
import { getSingleService } from "@/server/service.service";
import Button1 from "@/components/reusable/Button1";
import GiveReview from "@/components/shared/GiveReview";

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
        <section className="sticky top-0 h-screen">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover object-[center_40%]"
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
              <span className="text-[10px] uppercase tracking-[0.25em]">
                Details
              </span>
              <FaChevronDown className="animate-bounce text-sm" />
            </a>
          </div>
        </section>

        <div className="relative z-10 bg-base-200">
          <PerforatedDivider tone="base-200" />

          <div className="sticky top-0 z-40 backdrop-blur bg-base-200/80 border-b border-base-300/60">
            <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
              <div className="flex gap-6 font-medium">
                <a href="#about" className="hover:text-cyan-500 transition">
                  About
                </a>
                <a href="#gallery" className="hover:text-cyan-500 transition">
                  Gallery
                </a>
                <a
                  href="#advantages"
                  className="hover:text-cyan-500 transition"
                >
                  Why Us
                </a>
              </div>

              <span className="hidden sm:inline font-mono text-xs text-accent/70 tracking-widest">
                FILE / {serial}
              </span>
            </nav>
          </div>

          {/*About */}
          <section
            id="about"
            className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20"
          >
            <Animate>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                    Details — Service File
                  </p>

                  <h2 className="text-4xl font-semibold mb-6">
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
                </div>
              </div>
            </Animate>
          </section>

          <PerforatedDivider tone="base-200" />

          {/* Photo Gallery */}
          <section
            id="gallery"
            className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20"
          >
            <Animate type="zoom">
              <h2 className="text-4xl font-semibold mb-10 text-center">
                Service Gallery
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {service.images.map((img, index) => (
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
                  </div>
                ))}
              </div>
            </Animate>
          </section>

          <PerforatedDivider tone="base-200" />

          {/* Advantages */}
          <section
            id="advantages"
            className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20"
          >
            <Animate>
              <h2 className="text-4xl font-semibold text-center mb-12">
                Why Choose Us?
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {service.advantages.map((item, index) => (
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
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-base-200" />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-base-200" />

                    <GrCheckmark className="text-cyan-500 text-3xl mb-5" />

                    <p className="font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </Animate>
          </section>

          <div className="py-20">
            <GiveReview
              serviceId={service._id.toString()}
              serviceName={service.title}
            />
          </div>
        </div>

        {/* Book Button */}
        <Link
          href={`/booking?slug=${service.slug}`}
          className="fixed bottom-8 right-22 z-50"
        >
          <div className="relative flex items-center justify-center">
            <Button1 className="flex items-center gap-2 py-3 font-semibold">
              <FaCalendarCheck />
              Book Service
            </Button1>
          </div>
        </Link>
      </main>
    );
};

export default ServiceDetails;