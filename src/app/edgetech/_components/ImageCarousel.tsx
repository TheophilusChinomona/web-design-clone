"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
  autoPlayInterval?: number;
}

export function ImageCarousel({
  images,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoPlayInterval) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full shrink-0 flex items-center justify-center relative"
          >
            <div className="w-full relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Prev Button */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-[#3a3a3a] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      {/* Navigation Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-[#3a3a3a] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? "bg-[#6592c7] w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
