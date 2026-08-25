import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";

export const metadata = {
  title: "Services - EdgeTech Solutions",
  description:
    "Industrial Wood Edging & Finishing Services. We provide specialized edging and finishing solutions designed for furniture manufacturers and professional cabinet makers.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F2F5F7] py-14 md:py-20 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-4">
            <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
              What We Do
            </h6>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-heading font-semibold text-[#3a3a3a]">
              Industrial Wood Edging &amp; Finishing Services.
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#4B4F58] max-w-[700px] leading-relaxed">
              We provide specialized edging and finishing solutions designed for
              the high standards of furniture manufacturers and professional
              cabinet makers.
            </p>
          </div>
        </section>

        {/* Section 2: Specialization & Facility */}
        <section className="py-16 md:py-24 bg-white border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[#3a3a3a] leading-tight">
                  We Are Specialized in The Precision Wood Edging &amp; Surface
                  Finishing of Premium Cabinetry Projects.
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                  Our Midrand facility is equipped with state-of-the-art
                  machinery to handle high-volume production while maintaining
                  the artisanal quality required for custom wood finishing.
                </p>
                <div className="pt-2">
                  <Link
                    href="/edgetech/contact"
                    className="inline-flex items-center justify-center bg-[#3a3a3a] hover:bg-[#4B4F58] text-white px-8 py-3.5 text-[15px] font-heading font-medium tracking-wide transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden shadow-sm">
                  <Image
                    src="/images/service-under-hero.webp"
                    alt="Precision wood edging workshop"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Offering */}
        <section className="py-16 md:py-24 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-12">
            <div className="text-center max-w-[600px] mx-auto space-y-3">
              <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
                Comprehensive Capabilities
              </h6>
              <h3 className="text-[32px] sm:text-[40px] font-heading font-semibold text-[#3a3a3a]">
                Our Offering
              </h3>
            </div>

            {/* 3 Service Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="p-8 bg-white border border-[#eaeaea] shadow-xs hover:border-[#6592c7] transition-all group">
                <span className="text-[14px] font-heading font-bold text-[#6592c7] tracking-wider block mb-3">
                  01.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-4 group-hover:text-[#6592c7] transition-colors">
                  Precision Wood Edging
                </h4>
                <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                  Professional application of high-quality wood veneers and
                  synthetic edging to ensure a seamless, durable finish for all
                  board types.
                </p>
              </div>

              {/* Service 2 */}
              <div className="p-8 bg-white border border-[#eaeaea] shadow-xs hover:border-[#6592c7] transition-all group">
                <span className="text-[14px] font-heading font-bold text-[#6592c7] tracking-wider block mb-3">
                  02.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-4 group-hover:text-[#6592c7] transition-colors">
                  Surface Finishing
                </h4>
                <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                  Expert surface treatments and finishing techniques to enhance
                  the natural beauty and longevity of your wood products.
                </p>
              </div>

              {/* Service 3 */}
              <div className="p-8 bg-white border border-[#eaeaea] shadow-xs hover:border-[#6592c7] transition-all group">
                <span className="text-[14px] font-heading font-bold text-[#6592c7] tracking-wider block mb-3">
                  03.
                </span>
                <h4 className="text-[22px] font-heading font-semibold text-[#3a3a3a] mb-4 group-hover:text-[#6592c7] transition-colors">
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
      </main>

      <Footer />
    </div>
  );
}
