"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface DownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({ className, children }: DownloadButtonProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      alert("Pehle Login ya Register karein, tabhi app download hoga!");
      const regSection = document.getElementById("register-section");
      if (regSection) {
        regSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Agar logged in hai, toh MediaFire link khol do
      window.open("https://www.mediafire.com/file/54n671drgrpsdjp/MYT%F0%9F%87%AE%F0%9F%87%B3.apk/file", "_blank");
    }
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={className || "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all"}
    >
      {children || "Download APK Now"}
    </button>
  );
}
