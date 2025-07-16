"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Home, Eye, EyeOff } from "lucide-react";

interface LoginData {
  userName: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [savedData, setSavedData] = useState<LoginData | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    const payload: LoginData = {
      userName,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json(); 
      } catch {
        data = { detail: "Login failed." };
      }

      if (response.ok) {
        setSavedData(payload);
        toast.success("Login successful!");
        localStorage.setItem("userName", userName);
        router.push("/user-info");
      } else {
        if (data.detail === "User does not exist. Please sign up first.") {
          toast.error(data.detail);
          router.push("/sign-up");
        } else if (data.detail === "Incorrect password.") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(data.detail || "Login failed.");
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full font-semibold"
          >
            <Home size={24} color="blue" />
            <span>Home</span>
          </button>
          <button
            onClick={() => router.push("/sign-in")}
            className="text-white bg-white/10 px-4 py-2 rounded-full font-semibold"
          >
            Sign up
          </button>
        </div>
        <h2 className="text-white text-2xl font-semibold mb-6">
          Login into your account
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />

        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={handleLogin}
            className="bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition w-[48%]"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push("/login/password-reset")}
            className="bg-gray-700 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition w-[48%]"
          >
            Forgot password
          </button>
        </div>
      </div>
    </div>
  );
}
