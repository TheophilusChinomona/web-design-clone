import React from "react";
import { Navbar } from "@/app/edgetech/_components/Navbar";
import { Footer } from "@/app/edgetech/_components/Footer";

export const metadata = {
  title: "Privacy Policy - EdgeTech Solutions",
  description: "Privacy Policy for EdgeTech Solutions website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#4B4F58]">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#F2F5F7] py-14 md:py-20 border-b border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-4">
            <h6 className="text-[12px] uppercase tracking-[2px] font-heading font-semibold text-[#6592c7]">
              Legal
            </h6>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[50px] font-heading font-semibold text-[#3a3a3a]">
              Privacy Policy
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[900px] mx-auto px-5 sm:px-8 space-y-8 text-[15px] sm:text-[16px] text-[#4B4F58] leading-relaxed">
            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Who we are
              </h2>
              <p>
                Our website address is:{" "}
                <a
                  href="https://www.edgetechsolutions.co.za"
                  className="text-[#6592c7] hover:underline"
                >
                  https://www.edgetechsolutions.co.za
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Comments
              </h2>
              <p>
                When visitors leave comments on the site we collect the data
                shown in the comments form, and also the visitor’s IP address and
                browser user agent string to help spam detection.
              </p>
              <p className="mt-3">
                An anonymized string created from your email address (also called
                a hash) may be provided to the Gravatar service to see if you
                are using it. The Gravatar service privacy policy is available
                here: https://automattic.com/privacy/. After approval of your
                comment, your profile picture is visible to the public in the
                context of your comment.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Media
              </h2>
              <p>
                If you upload images to the website, you should avoid uploading
                images with embedded location data (EXIF GPS) included. Visitors
                to the website can download and extract any location data from
                images on the website.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Cookies
              </h2>
              <p>
                If you leave a comment on our site you may opt-in to saving your
                name, email address and website in cookies. These are for your
                convenience so that you do not have to fill in your details again
                when you leave another comment. These cookies will last for one
                year.
              </p>
              <p className="mt-3">
                If you visit our login page, we will set a temporary cookie to
                determine if your browser accepts cookies. This cookie contains
                no personal data and is discarded when you close your browser.
              </p>
              <p className="mt-3">
                When you log in, we will also set up several cookies to save your
                login information and your screen display choices. Login cookies
                last for two days, and screen options cookies last for a year. If
                you select &ldquo;Remember Me&rdquo;, your login will persist
                for two weeks. If you log out of your account, the login
                cookies will be removed.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Embedded content from other websites
              </h2>
              <p>
                Articles on this site may include embedded content (e.g.
                videos, images, articles, etc.). Embedded content from other
                websites behaves in the exact same way as if the visitor has
                visited the other website.
              </p>
              <p className="mt-3">
                These websites may collect data about you, use cookies, embed
                additional third-party tracking, and monitor your interaction
                with that embedded content, including tracking your interaction
                with the embedded content if you have an account and are logged
                in to that website.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Who we share your data with
              </h2>
              <p>
                If you request a password reset, your IP address will be included
                in the reset email.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                How long we retain your data
              </h2>
              <p>
                If you leave a comment, the comment and its metadata are
                retained indefinitely. This is so we can recognize and approve
                any follow-up comments automatically instead of holding them in
                a moderation queue.
              </p>
              <p className="mt-3">
                For users that register on our website (if any), we also store
                the personal information they provide in their user profile. All
                users can see, edit, or delete their personal information at any
                time (except they cannot change their username). Website
                administrators can also see and edit that information.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                What rights you have over your data
              </h2>
              <p>
                If you have an account on this site, or have left comments, you
                can request to receive an exported file of the personal data we
                hold about you, including any data you have provided to us. You
                can also request that we erase any personal data we hold about
                you. This does not include any data we are obliged to keep for
                administrative, legal, or security purposes.
              </p>
            </div>

            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-3">
                Where your data is sent
              </h2>
              <p>
                Visitor comments may be checked through an automated spam
                detection service.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
