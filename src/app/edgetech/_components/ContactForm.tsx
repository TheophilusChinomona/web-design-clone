"use client";

import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setResponseMsg("");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setResponseMsg(json.message || "Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setResponseMsg(json.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setResponseMsg(err.message || "Network error. Please try again.");
    }
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 shadow-xs">
      <h3 className="text-[24px] font-heading font-semibold text-[#3a3a3a] mb-6">
        Send Me a Message
      </h3>

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm mb-6 rounded-xs">
          {responseMsg}
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm mb-6 rounded-xs">
          {responseMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="NAME"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#6592c7] focus:outline-hidden text-sm bg-[#fafafa]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="EMAIL"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#6592c7] focus:outline-hidden text-sm bg-[#fafafa]"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="SUBJECT"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#6592c7] focus:outline-hidden text-sm bg-[#fafafa]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
          >
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            required
            placeholder="MESSAGE"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#6592c7] focus:outline-hidden text-sm bg-[#fafafa]"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#3a3a3a] hover:bg-[#4B4F58] text-white px-8 py-3.5 text-[15px] font-heading font-medium tracking-wide transition-colors cursor-pointer disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
