"use client";

import React from "react";

interface DownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({ className, children }: DownloadButtonProps) {
  const handleClick = () => {
    // Bina kisi check ke seedha MediaFire APK download link khul jayega
    window.open("https://www.mediafire.com/file/271df7f4lc036p6/MYT_%25F0%259F%2587%25AE%25F0%259F%2587%25B3.apk/file", "_blank");
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={className || "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer"}
    >
      {children || "Download APK Now"}
    </button>
  );
}
