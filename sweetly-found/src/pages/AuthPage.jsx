import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Mail, Lock, UserCircle2, Sparkles, Cake, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  location: "",
  birthday: "",
  about: "",
  newsletter: true,
};

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signup, login, loginWithGoogle } = useAuth();
  const { notify } = useCart();

  const isSignup = mode === "signup";

  const features = useMemo(() => [
    "Track orders in one place",
    "Save favorite bakers and treats",
    "Receive local offers and updates",
  ], []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (isSignup) {
      if (!form.name.trim() || !form.email.trim() || !form.password) {
        setError("Please complete your name, email, and password.");
        return;
      }
      try {
        signup({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          location: form.location,
          birthday: form.birthday,
          about: form.about,
          newsletter: form.newsletter,
        });
        setSuccess("Welcome aboard! Your account is ready.");
        notify("Account created successfully");
        navigate("/account");
      } catch (err) {
        setError(err.message || "Unable to create your account right now.");
      }
      return;
    }

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      login(form.email, form.password);
      setSuccess("You’re signed in.");
      notify("Welcome back to Sweetly Found");
      navigate("/account");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleGoogle = () => {
    try {
      loginWithGoogle("Google User");
      notify("Signed in with Google");
      navigate("/account");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,215,222,0.7),_transparent_48%),linear-gradient(135deg,_#fffaf6_0%,_#fdf1f3_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-maroon-100 bg-white/90 shadow-cardHover backdrop-blur lg:flex-row">
        <div className="relative flex-1 bg-maroon-700 px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_40%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur">
                <Cake className="h-4 w-4" /> Sweetly Found
              </Link>
              <h1 className="mt-6 font-display text-3xl sm:text-4xl font-semibold leading-tight">
                Welcome to your neighborhood dessert hub.
              </h1>
              <p className="mt-4 max-w-md text-sm sm:text-base text-white/80 leading-7">
                Create an account to save favorite treats, track orders, and get invited to fresh drops from local bakers.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              {features.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-maroon-700">{isSignup ? "Sign up" : "Login"}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-maroon-900">
                {isSignup ? "Create your account" : "Welcome back"}
              </h2>
            </div>
            <div className="rounded-full border border-maroon-100 bg-blush-100 p-2 text-maroon-700">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          {error ? <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
          {success ? <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Full name</span>
                    <div className="flex items-center gap-2 rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5">
                      <UserCircle2 className="h-4 w-4 text-maroon-600" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none"
                        placeholder="Ava Baker"
                        required
                      />
                    </div>
                  </label>
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Email</span>
                    <div className="flex items-center gap-2 rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5">
                      <Mail className="h-4 w-4 text-maroon-600" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Password</span>
                    <div className="flex items-center gap-2 rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5">
                      <Lock className="h-4 w-4 text-maroon-600" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none"
                        placeholder="Create a password"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-maroon-600">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Phone</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5 outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Location</span>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5 outline-none"
                      placeholder="Brooklyn, NY"
                    />
                  </label>
                  <label className="block text-sm text-maroon-900/70">
                    <span className="mb-1.5 block font-medium">Birthday</span>
                    <input
                      name="birthday"
                      type="date"
                      value={form.birthday}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5 outline-none"
                    />
                  </label>
                </div>

                <label className="block text-sm text-maroon-900/70">
                  <span className="mb-1.5 block font-medium">Tell us about yourself</span>
                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5 outline-none"
                    placeholder="I love custom cakes for birthdays and baby showers."
                  />
                </label>

                <label className="flex items-center gap-3 text-sm text-maroon-900/70">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-maroon-300 accent-maroon-700"
                  />
                  <span>Send me sweet updates and seasonal offers.</span>
                </label>
              </>
            ) : (
              <>
                <label className="block text-sm text-maroon-900/70">
                  <span className="mb-1.5 block font-medium">Email</span>
                  <div className="flex items-center gap-2 rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5">
                    <Mail className="h-4 w-4 text-maroon-600" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </label>

                <label className="block text-sm text-maroon-900/70">
                  <span className="mb-1.5 block font-medium">Password</span>
                  <div className="flex items-center gap-2 rounded-xl border border-maroon-100 bg-blush-50 px-3 py-2.5">
                    <Lock className="h-4 w-4 text-maroon-600" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                      placeholder="Enter your password"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-maroon-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
              </>
            )}

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon-700 px-4 py-3 font-semibold text-white transition hover:bg-maroon-800">
              {isSignup ? "Create account" : "Login"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-maroon-100" />
            <span className="text-sm text-maroon-900/60">or continue with</span>
            <div className="h-px flex-1 bg-maroon-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-maroon-200 bg-white px-4 py-3 font-semibold text-maroon-700 transition hover:bg-blush-100"
          >
            <Mail className="h-4 w-4" /> Continue with Google
          </button>

          <p className="mt-6 text-sm text-maroon-900/70">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(isSignup ? "login" : "signup");
                setError("");
                setSuccess("");
              }}
              className="font-semibold text-maroon-700 underline-offset-4 hover:underline"
            >
              {isSignup ? "Login instead" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
