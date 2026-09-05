import { auth } from "@/lib/firebase";

export const handleDownload = (e: React.MouseEvent) => {
  // Check karo ki user Firebase mein logged-in hai ya nahi
  if (!auth.currentUser) {
    e.preventDefault();
    
    // Agar user logged-in nahi hai, toh registration section par scroll karwa do
    const regSection = document.getElementById("register-section");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Please login or register first to download the APK!");
    }
  } else {
    // Agar logged-in hai, toh seedha MediaFire ka link khul jayega
    window.open("https://www.mediafire.com/file/54n671drgrpsdjp/MYT%F0%9F%87%AE%F0%9F%87%B3.apk/file", "_blank");
  }
};
