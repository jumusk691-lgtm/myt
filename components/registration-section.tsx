"use client";

import { useState, useEffect } from "react";
import { auth, database } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Smartphone, TrendingUp, Lock, Mail, User, Phone, Gift } from "lucide-react";

export function RegistrationSection() {
  const [isLoginMode, setIsLoginMode] = useState(false); // Toggle between Login & Register
  
  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // --- LOGIN LOGIC ---
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! You can now download the APK.");
      } else {
        // --- REGISTER LOGIC ---
        if (mobile.length !== 10) {
          alert("Please enter a valid 10-digit mobile number.");
          return;
        }

        // Firebase Auth mein user create karo (Email & Password se)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // Realtime Database ke 'users_details' node mein saari details save karo
        await set(ref(database, 'users_details/' + newUser.uid), {
          uid: newUser.uid,
          fullName: fullName,
          email: email,
          mobile: mobile,
          referralCode: referral || "N/A",
          createdAt: new Date().toISOString()
        });

        alert("Registration Successful! Data saved to Firebase.");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully.");
  };

  if (loading) return null;

  return (
    <section id="register-section" className="px-4 py-16 sm:px-6 sm:py-24" aria-label="Register and download">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-glow">
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            {isLoginMode ? "User Login" : "Create Account"}
          </span>
          <h2 className="mx-auto mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isLoginMode ? "Login to Download MYT App" : "Join TradeND & Download APK"}
          </h2>
        </div>

        <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-xl text-card-foreground">
          {user ? (
            // --- AGAR USER LOGGED IN HAI, TOH DIRECT DOWNLOAD LINK DIKHAYO ---
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold mb-3 text-green-500">Account Verified!</h3>
              <p className="text-sm text-muted-foreground mb-6">Aapka account successfully logged in hai. Niche diye button se MediaFire APK download karein.</p>
              
              <a 
                href="https://www.mediafire.com/file/54n671drgrpsdjp/MYT%F0%9F%87%AE%F0%9F%87%B3.apk/file" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-center mb-4 transition-all shadow-lg shadow-green-600/20"
              >
                Download APK Now (MediaFire)
              </a>

              <button 
                onClick={handleLogout}
                className="text-xs text-red-400 underline hover:text-red-300 mt-2"
              >
                Logout Account
              </button>
            </div>
          ) : (
            // --- LOGIN / REGISTER FORM ---
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name (Only for Register) */}
                {!isLoginMode && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Full Name (KYC Name)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required={!isLoginMode}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Mobile Number (Only for Register) */}
                {!isLoginMode && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">10-Digit Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="tel" 
                        maxLength={10}
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        required={!isLoginMode}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    {isLoginMode ? "Password" : "Set Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Referral Code (Only for Register) */}
                {!isLoginMode && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Referral Code (Optional)</label>
                    <div className="relative">
                      <Gift className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={referral} 
                        onChange={(e) => setReferral(e.target.value)} 
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                        placeholder="Optional code"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 mt-2"
                >
                  {isLoginMode ? "LOGIN TO ACCOUNT" : "REGISTER NOW"}
                </button>
              </form>

              {/* Toggle Link */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {isLoginMode ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => setIsLoginMode(false)} className="text-primary underline font-semibold">
                      Register Now
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setIsLoginMode(true)} className="text-primary underline font-semibold">
                      Login here
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
