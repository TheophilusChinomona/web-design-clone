import React from "react";
import Image from "next/image";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";

export const metadata = {
  title: "Our Process - EdgeTech Solutions",
  description:
    "Our Process. From material selection to the final industrial polish, our streamlined process ensures every edge meets your exact technical specifications.",
};

const processSteps = [
  {
    step: "01.",
    title: "Material & Specification Review",
    description:
      "We begin by assessing your board type and matching it with the perfect veneer or synthetic edging material to ensure a flawless bond.",
    image1: "/images/process-image-01.webp",
    image2:
      "/images/process-image-02-rk92s68sejrsrzbteedhni5dudqwizz46lvyumj6ps.webp",
  },
  {
    step: "02.",
    title: "Precision Industrial Edging",
    description:
      "Your boards are processed through our advanced edge-banding machinery, applying heat and pressure for a durable, industrial-grade finish.",
    image1: "/images/process-image-03.webp",
    image2:
      "/images/process-image-04-rk92xw3fz9llel0t0dcsbk7bxrkacpobywray81yv4.webp",
  },
  {
    step: "03.",
    title: "Quality Finishing & Inspection",
    description:
      "Every piece undergoes a final surface treatment and manual quality check to ensure the edges are smooth, seamless, and ready for installation.",
    image1: "/images/process-image-05.webp",
    image2:
      "/images/process-image-06-rk9345opji6eszx4f2v8xz9yi8odo2jwtxbu4mrhds.webp",
  },
];

export default function OurProcessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F2F5F7] py-14 md:py-20 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-4">
            <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
              Step-by-Step Excellence
            </h6>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-heading font-semibold text-[#3a3a3a]">
              Our Process
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#4B4F58] max-w-[700px] leading-relaxed">
              From material selection to the final industrial polish, our
              streamlined process ensures every edge meets your exact technical
              specifications.
            </p>
          </div>
        </section>

        {/* Section 2: Process Overview */}
        <section className="py-16 md:py-20 bg-white border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-6">
            <h3 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[#3a3a3a]">
              Specialized Industrial Wood Edging &amp; Surface Finishing.
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#4B4F58] max-w-[850px] leading-relaxed">
              Our Midrand facility follows a rigorous quality-controlled process
              to ensure every board is finished to perfection. We combine
              state-of-the-art automated edge-banding with expert manual
              inspection to provide a seamless result for every furniture
              manufacturer and cabinet maker we serve.
            </p>
          </div>
        </section>

        {/* Section 3: The 3 Process Steps */}
        <section className="py-12 md:py-20 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-20">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-8 sm:p-12 border border-[#eaeaea] shadow-xs"
              >
                {/* Text Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-[20px] font-heading font-bold text-[#6592c7]">
                      {step.step}
                    </span>
                    <div className="h-[2px] w-8 bg-[#6592c7]" />
                  </div>
                  <h4 className="text-[22px] sm:text-[26px] font-heading font-semibold text-[#3a3a3a]">
                    {step.title}
                  </h4>
                  <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Images Column */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative aspect-[5/6] overflow-hidden shadow-xs">
                    <Image
                      src={step.image1}
                      alt={`${step.title} stage 1`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                  <div className="relative aspect-[5/6] overflow-hidden shadow-xs">
                    <Image
                      src={step.image2}
                      alt={`${step.title} stage 2`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
