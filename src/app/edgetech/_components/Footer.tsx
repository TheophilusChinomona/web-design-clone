import React from "react";
import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./icons";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#f3f3f3] text-[#4B4F58] mt-auto font-sans">
      {/* Main 3-Column Footer */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Get In Touch */}
          <div>
            <h2 className="text-[21px] font-heading font-semibold text-[#3a3a3a] mb-5 capitalize">
              Get In Touch
            </h2>
            <p className="text-[15px] leading-relaxed text-[#4B4F58]">
              Ready to elevate your wood projects with the perfect edge? Contact
              EdgeTech Solutions today for premium finishing services.
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div>
            <h2 className="text-[21px] font-heading font-semibold text-[#3a3a3a] mb-5 capitalize">
              Contact Details
            </h2>
            <div className="space-y-3 text-[15px]">
              <p className="font-semibold text-[#3a3a3a]">EdgeTech Solutions</p>
              <div>
                <p className="text-gray-500 text-sm">Phone:</p>
                <a
                  href="tel:+27650762860"
                  className="font-semibold text-[#3a3a3a] hover:text-[#6592c7] transition-colors"
                >
                  +27 65 076 2860
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email:</p>
                <a
                  href="mailto:info@edgetechsolutions.co.za"
                  className="font-semibold text-[#3a3a3a] hover:text-[#6592c7] transition-colors"
                >
                  info@edgetechsolutions.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: My Location & Socials */}
          <div>
            <h2 className="text-[21px] font-heading font-semibold text-[#3a3a3a] mb-5 capitalize">
              My Location
            </h2>
            <div className="space-y-3 text-[15px] text-[#4B4F58]">
              <p>Unit G21, Cnr. Brand Road &amp;, Swart Dr, President Park A/H</p>
              <p>Midrand, Gauteng, 1685</p>
              <p className="pt-1">
                <Link
                  href="/edgetech/privacy-policy"
                  className="font-semibold text-[#3a3a3a] hover:text-[#6592c7] underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-[18px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Follow Me
              </h3>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#557dbc]/10 text-[#557dbc] hover:bg-[#557dbc] hover:text-white transition-all transform hover:scale-110"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#7acdee]/10 text-[#7acdee] hover:bg-[#7acdee] hover:text-white transition-all transform hover:scale-110"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e96651]/10 text-[#e96651] hover:bg-[#e96651] hover:text-white transition-all transform hover:scale-110"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8a3ab9]/10 text-[#8a3ab9] hover:bg-[#8a3ab9] hover:text-white transition-all transform hover:scale-110"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1c86c6]/10 text-[#1c86c6] hover:bg-[#1c86c6] hover:text-white transition-all transform hover:scale-110"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-[#f3f3f3] py-6 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[14px] text-gray-500 gap-3">
          <p>Copyright &copy; 2026 EdgeTech Solutions</p>
          <p>Powered By EdgeTech Solutions</p>
        </div>
      </div>
    </footer>
  );
}
