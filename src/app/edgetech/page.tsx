import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";
import { ImageCarousel } from "@/app/edgetech/_components/ImageCarousel";
import {
  CouchIcon,
  UserIcon,
  LongArrowRightIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/app/edgetech/_components/icons";

export const metadata = {
  title: "Home - EdgeTech Solutions",
  description:
    "Premium Wood Edging Specialists. EdgeTech Solutions: Precision Wood Finishing & Edging. High-quality wood edging and surface finishing solutions for furniture manufacturers and cabinet makers.",
};

const projectImages = [
  {
    src: "/images/home-projects-03.webp",
    alt: "Commercial and residential wood edging project 03",
  },
  {
    src: "/images/home-projects-01.webp",
    alt: "Commercial and residential wood edging project 01",
  },
  {
    src: "/images/home-projects-02.webp",
    alt: "Commercial and residential wood edging project 02",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <section className="relative bg-white py-12 md:py-20 lg:py-24 overflow-hidden border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
                  Premium Wood Edging Specialists
                </h6>
                <h1 className="text-[32px] sm:text-[42px] lg:text-[54px] font-heading font-semibold text-[#3a3a3a] leading-[1.15]">
                  EdgeTech Solutions: Precision Wood Finishing &amp; Edging.
                </h1>
                <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed max-w-[580px]">
                  High-quality wood edging and surface finishing solutions for
                  furniture manufacturers, cabinet makers, and interior wood
                  projects. We provide the perfect finish for every edge.
                </p>

                {/* Inline Stats */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-2">
                  <div className="flex items-center space-x-3 text-[#3a3a3a]">
                    <div className="w-10 h-10 rounded-full bg-[#6592c7]/15 text-[#6592c7] flex items-center justify-center">
                      <CouchIcon className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-semibold text-[15px]">
                      400+ Projects Done
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[#3a3a3a]">
                    <div className="w-10 h-10 rounded-full bg-[#6592c7]/15 text-[#6592c7] flex items-center justify-center">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-semibold text-[15px]">
                      100+ Happy Clients
                    </span>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="pt-2">
                  <Link href="/edgetech/about" className="link-underline-btn group inline-flex items-center gap-2 text-[15px] font-medium text-[#3a3a3a] hover:text-[#6592c7] transition-colors">
                    <LongArrowRightIcon className="w-4 h-4 text-[#3a3a3a] group-hover:text-[#6592c7]" />
                    <span>Read More</span>
                  </Link>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[460px] aspect-[2/3] overflow-hidden shadow-sm">
                  <Image
                    src="/images/home-hero-2.webp"
                    alt="EdgeTech Solutions precision wood edging"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Commitment to Quality */}
        <section className="bg-[#F2F5F7] py-14 md:py-18">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-[26px] sm:text-[32px] font-heading font-semibold text-[#3a3a3a]">
                  Our Commitment to Quality.
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                  With decades of combined experience in the timber and
                  cabinetry industry, EdgeTech Solutions provides the precision
                  and reliability required for high-end furniture manufacturing.
                  We utilize state-of-the-art machinery to ensure every board is
                  finished to perfection.
                </p>
              </div>

              <div className="md:col-span-4 flex md:justify-end items-center space-x-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#557dbc] hover:bg-[#557dbc] hover:text-white shadow-xs transition-all transform hover:scale-110"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#7acdee] hover:bg-[#7acdee] hover:text-white shadow-xs transition-all transform hover:scale-110"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#e96651] hover:bg-[#e96651] hover:text-white shadow-xs transition-all transform hover:scale-110"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1c86c6] hover:bg-[#1c86c6] hover:text-white shadow-xs transition-all transform hover:scale-110"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Services */}
        <section className="py-16 md:py-24 bg-white border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7] mb-2">
                  What I Do
                </h6>
                <h2 className="text-[32px] sm:text-[40px] font-heading font-semibold text-[#3a3a3a]">
                  Services.
                </h2>
              </div>
              <div>
                <Link href="/edgetech/services" className="link-underline-btn group inline-flex items-center gap-2 text-[15px] font-medium text-[#3a3a3a] hover:text-[#6592c7] transition-colors">
                  <LongArrowRightIcon className="w-4 h-4 text-[#3a3a3a] group-hover:text-[#6592c7]" />
                  <span>View All Services</span>
                </Link>
              </div>
            </div>

            {/* 3 Service Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 bg-[#fafafa] border border-[#f0f0f0] transition-all hover:shadow-md hover:border-gray-200">
                <span className="text-[13px] font-heading font-bold text-[#6592c7] tracking-wider block mb-2">
                  01.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-3">
                  Precision Wood Edging
                </h4>
                <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                  Professional application of high-quality wood veneers and
                  synthetic edging to ensure a seamless, durable finish for all
                  board types.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 bg-[#fafafa] border border-[#f0f0f0] transition-all hover:shadow-md hover:border-gray-200">
                <span className="text-[13px] font-heading font-bold text-[#6592c7] tracking-wider block mb-2">
                  02.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-3">
                  Surface Finishing
                </h4>
                <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                  Expert surface treatments and finishing techniques to enhance
                  the natural beauty and longevity of your wood products.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 bg-[#fafafa] border border-[#f0f0f0] transition-all hover:shadow-md hover:border-gray-200">
                <span className="text-[13px] font-heading font-bold text-[#6592c7] tracking-wider block mb-2">
                  03.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-3">
                  Custom Edge Solutions
                </h4>
                <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                  Tailored edging services designed to meet specific project
                  requirements, from unique furniture pieces to large-scale
                  cabinetry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Projects Showcase Carousel */}
        <section className="py-16 md:py-24 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Info */}
              <div className="lg:col-span-5 space-y-6">
                <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
                  Most Recent
                </h6>
                <h2 className="text-[32px] sm:text-[40px] font-heading font-semibold text-[#3a3a3a]">
                  Projects.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                  Explore our portfolio of recent commercial and residential
                  projects, showcasing our diverse capabilities in PVC, veneer,
                  and solid wood edging.
                </p>
                <div className="pt-2">
                  <Link href="/edgetech/services" className="link-underline-btn group inline-flex items-center gap-2 text-[15px] font-medium text-[#3a3a3a] hover:text-[#6592c7] transition-colors">
                    <LongArrowRightIcon className="w-4 h-4 text-[#3a3a3a] group-hover:text-[#6592c7]" />
                    <span>View All Services</span>
                  </Link>
                </div>
              </div>

              {/* Right Carousel */}
              <div className="lg:col-span-7">
                <ImageCarousel images={projectImages} autoPlayInterval={5000} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
