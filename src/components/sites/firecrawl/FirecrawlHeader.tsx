"use client";

import React from "react";
import { FirecrawlLogo, CrosshairDecoration } from "./icons";

export function FirecrawlHeader() {
  return (
    <div className="relative border-b border-[#ededed] dark:border-[#2a2a2a] pt-12 pb-8">
      {/* Top Left & Right Crosshairs */}
      <CrosshairDecoration className="absolute -top-[10px] -left-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
      <CrosshairDecoration className="absolute -top-[10px] -right-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />

      {/* Flame & Logo */}
      <div className="flex items-center justify-center relative z-10">
        <FirecrawlLogo className="text-[#171717] dark:text-[#f5f5f5]" />
      </div>

      {/* Bottom Left & Right Crosshairs */}
      <CrosshairDecoration className="absolute -bottom-[10px] -left-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
      <CrosshairDecoration className="absolute -bottom-[10px] -right-[10.5px] text-[#ededed] dark:text-[#2a2a2a]" />
    </div>
  );
}
