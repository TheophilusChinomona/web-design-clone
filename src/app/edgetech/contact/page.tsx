import React from "react";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";
import { ContactForm } from "@/app/edgetech/_components/ContactForm";
import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/app/edgetech/_components/icons";

export const metadata = {
  title: "Contact - EdgeTech Solutions",
  description:
    "Contact EdgeTech Solutions. Let's discuss your next wood finishing or edging project.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F2F5F7] py-14 md:py-20 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-4">
            <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
              Get In Touch
            </h6>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-heading font-semibold text-[#3a3a3a]">
              Contact
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#4B4F58] max-w-[700px] leading-relaxed">
              Let&apos;s discuss your next wood finishing or edging project.
            </p>
          </div>
        </section>

        {/* Section 2: Contact Details & Form */}
        <section className="py-16 md:py-24 bg-white border-b border-[#f3f3f3]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Contact Detail */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h4 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-4">
                    Contact Detail
                  </h4>
                  <div className="space-y-3 text-[15px] text-[#4B4F58]">
                    <p className="font-semibold text-[#3a3a3a] text-lg">
                      EdgeTech Solutions
                    </p>
                    <p>
                      Phone:
                      <br />
                      <strong className="text-[#3a3a3a]">+27 12 345 6789</strong> / <strong className="text-[#3a3a3a]">+27 65 076 2860</strong>
                    </p>
                    <p>
                      Email:
                      <br />
                      <strong className="text-[#3a3a3a]">
                        info@edgetechsolutions.co.za
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h5 className="text-[20px] font-heading font-semibold text-[#3a3a3a] mb-3">
                    My Location
                  </h5>
                  <p className="text-[15px] text-[#4B4F58] leading-relaxed">
                    Unit G21, Cnr. Brand Road &amp;, Swart Drive, President Park
                    A/H
                    <br />
                    Midrand, Gauteng, 1685
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h5 className="text-[20px] font-heading font-semibold text-[#3a3a3a] mb-3">
                    Follow Me
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

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Embedded Google Map */}
        <section className="w-full h-[450px] bg-gray-100 relative">
          <iframe
            src="https://maps.google.com/maps?q=Unit%20G21%2C%20Cnr.%20Brand%20Road%20%26%2C%20Swart%20Drive%2C%20Presoident%20Park%20A%2FH&#038;t=m&#038;z=14&#038;output=embed&#038;iwloc=near"
            title="EdgeTech Solutions Location"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
