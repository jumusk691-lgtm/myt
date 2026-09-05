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
import { Smartphone, Lock, Mail, User, Phone, Gift, ShieldCheck } from "lucide-react";

export function RegistrationSection() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");

  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Step 1: Send OTP via Backend API Route
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 6-digit random OTP generate karna
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);

      // Backend API Route ko call karna jo Brevo se email bhejega
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, otp: randomOtp }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        alert("OTP successfully sent to your email address!");
      } else {
        alert("Failed to send OTP: " + (data.error || "Unknown error"));
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP & Register User in Firebase
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (enteredOtp !== generatedOtp) {
      alert("Invalid OTP! Kripya sahi OTP enter karein.");
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await set(ref(database, 'users_details/' + newUser.uid), {
        uid: newUser.uid,
        fullName: fullName,
        email: email,
        mobile: mobile,
        referralCode: referral || "N/A",
        createdAt: new Date().toISOString()
      });

      alert("Email Verified & Registration Successful!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful! You can now download the APK.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully.");
  };

  const handleSecureDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      e.preventDefault();
      alert("Pehle Login ya Register karein, tabhi app download hoga!");
    }
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
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold mb-3 text-green-500">Account Verified!</h3>
              <p className="text-sm text-muted-foreground mb-6">Aapka account successfully logged in hai. Niche diye button se MediaFire APK download karein.</p>
              
              <a 
                href="https://www.mediafire.com/file/54n671drgrpsdjp/MYT%F0%9F%87%AE%F0%9F%87%B3.apk/file" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleSecureDownload}
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
          ) : isLoginMode ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
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

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Password</label>
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

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 mt-2"
              >
                LOGIN TO ACCOUNT
              </button>
            </form>
          ) : !otpSent ? (
            /* REGISTRATION FORM - STEP 1 (FILL DETAILS & SEND OTP) */
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Full Name (KYC Name)</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">10-Digit Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="tel" 
                    maxLength={10}
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Set Password</label>
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

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 mt-2"
              >
                {isSubmitting ? "SENDING OTP..." : "SEND VERIFICATION OTP"}
              </button>
            </form>
          ) : (
            /* OTP VERIFICATION - STEP 2 (ENTER OTP) */
            <form onSubmit={handleVerifyAndRegister} className="space-y-4 text-center">
              <div className="mb-4">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold">Enter Email OTP</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Humne <span className="text-foreground font-semibold">{email}</span> par 6-digit OTP bheja hai.
                </p>
              </div>

              <div>
                <input 
                  type="text" 
                  maxLength={6}
                  value={enteredOtp} 
                  onChange={(e) => setEnteredOtp(e.target.value)} 
                  required
                  className="w-full text-center tracking-[1em] text-2xl py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:border-primary font-mono"
                  placeholder="------"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-600/20 mt-2"
              >
                {isSubmitting ? "VERIFYING..." : "VERIFY & REGISTER"}
              </button>

              <button 
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-muted-foreground underline hover:text-foreground mt-2 block mx-auto"
              >
                Wrong email? Go back
              </button>
            </form>
          )}

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
      </div>
    </section>
  );
}
