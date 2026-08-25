import React from "react";
import Image from "next/image";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";
import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/app/edgetech/_components/icons";

export const metadata = {
  title: "About - EdgeTech Solutions",
  description:
    "About EdgeTech Solutions. We are specialists in high-quality wood edging and surface finishing, dedicated to providing the perfect finish for furniture manufacturers and cabinet makers.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F2F5F7] py-14 md:py-20 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-4">
            <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
              Premium Wood Edging Specialists
            </h6>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-heading font-semibold text-[#3a3a3a]">
              About EdgeTech Solutions.
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#4B4F58] max-w-[700px] leading-relaxed">
              We are specialists in high-quality wood edging and surface
              finishing, dedicated to providing the perfect finish for furniture
              manufacturers and cabinet makers across South Africa.
            </p>
          </div>
        </section>

        {/* Section 2: Precision-Driven Finishing & Stats */}
        <section className="py-16 md:py-24 bg-white border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[#3a3a3a] leading-snug">
                  Precision-Driven Finishing.
                </h3>
                <div className="space-y-3">
                  <h5 className="text-[18px] font-heading font-semibold text-[#3a3a3a]">
                    Follow Us
                  </h5>
                  <div className="flex items-center space-x-3">
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#557dbc]/10 text-[#557dbc] hover:bg-[#557dbc] hover:text-white transition-all transform hover:scale-110"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="Twitter"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7acdee]/10 text-[#7acdee] hover:bg-[#7acdee] hover:text-white transition-all transform hover:scale-110"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e96651]/10 text-[#e96651] hover:bg-[#e96651] hover:text-white transition-all transform hover:scale-110"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1c86c6]/10 text-[#1c86c6] hover:bg-[#1c86c6] hover:text-white transition-all transform hover:scale-110"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Details & Stats */}
              <div className="lg:col-span-7 space-y-8">
                <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                  EdgeTech Solutions was founded on the principle of technical
                  excellence. We understand that the durability and aesthetic
                  of a project depend on the quality of its edges. Using
                  state-of-the-art machinery and premium materials, we ensure
                  that every board we touch meets the highest industrial
                  standards.
                </p>

                {/* Big Counters */}
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <div className="text-[36px] sm:text-[48px] font-heading font-bold text-[#6592c7]">
                      400+
                    </div>
                    <div className="text-[15px] font-heading font-semibold text-[#3a3a3a]">
                      Projects Done
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[36px] sm:text-[48px] font-heading font-bold text-[#6592c7]">
                      100+
                    </div>
                    <div className="text-[15px] font-heading font-semibold text-[#3a3a3a]">
                      Happy Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: What Sets Us Apart */}
        <section className="py-16 md:py-24 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-12">
            <div className="space-y-4 max-w-[800px]">
              <h3 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[#3a3a3a]">
                What Sets Us Apart
              </h3>
              <h5 className="text-[18px] sm:text-[20px] font-heading font-semibold text-[#6592c7]">
                I Innovate And Bring New Possibilities In The Interior Design Of
                Each House
              </h5>
              <p className="text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                Our professional application of high-quality wood veneers and
                synthetic edging is designed to create a seamless finish for all
                board types. By focusing on technical accuracy, we eliminate the
                common flaws associated with manual finishing, providing a
                consistent result that furniture manufacturers and cabinet
                makers can rely on for their most demanding projects.
              </p>
            </div>

            {/* 3-Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden shadow-xs">
                <Image
                  src="/images/about-images-01-rk91m6sb4ya9tqfv3e3fgew6bpxbozpsc0gxjbk9eo.webp"
                  alt="EdgeTech precision craftsmanship"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden shadow-xs">
                <Image
                  src="/images/about-images-02-rk91m7q5bsbk5cehxwi20wnmx3sowotio54f0liv8g.webp"
                  alt="EdgeTech workshop finishing"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden shadow-xs">
                <Image
                  src="/images/about-images-04-rk91p18ptw6iz8b1h4dri71f2pwc000j23kuuhcckg.webp"
                  alt="EdgeTech board finishing sample"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>

            {/* Specialization Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-gray-200">
              <div className="lg:col-span-5">
                <h3 className="text-[24px] sm:text-[30px] font-heading font-semibold text-[#3a3a3a] leading-tight">
                  We Are Specialized in The Precision Wood Edging &amp; Surface
                  Finishing of Premium Cabinetry Projects.
                </h3>
              </div>
              <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
                <p>
                  Beyond simple edging, we offer expert surface treatments and
                  finishing techniques that enhance the natural grain and
                  longevity of your materials. This comprehensive approach
                  ensures that the edges are not just covered, but integrated
                  into the design of the piece, offering a premium look that
                  elevates the overall quality of the final product.
                </p>
                <p>
                  We pride ourselves on providing tailored edging services
                  designed to meet specific project requirements, whether you
                  are working on a single unique furniture piece or large-scale
                  cabinetry for commercial developments. Our team is dedicated
                  to finding the right solution for every edge, ensuring your
                  vision is realized with industrial-grade precision.
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
