"use client";

import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaFlagUsa } from "react-icons/fa";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { Home } from "lucide-react";

interface signUpData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  countryCode: number;
  userName: string;
  password: string;
}

const countryCodes = [
  { name: "USA", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  { name: "India", code: "+91" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Brazil", code: "+55" },
  { name: "China", code: "+86" },
  { name: "Japan", code: "+81" },
  { name: "Mexico", code: "+52" },
  { name: "South Africa", code: "+27" },
  { name: "Russia", code: "+7" },
  { name: "Italy", code: "+39" },
  { name: "Spain", code: "+34" },
];

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [savedData, setSavedData] = useState<signUpData | null>(null);

  async function handleCreateAccount() {
    const payload: signUpData = {
      firstName,
      lastName,
      email,
      phoneNo: Number(phone),
      countryCode: Number(countryCode.replace("+", "")),
      userName,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setSavedData(payload);
        toast.success("Account Created Successfully");
        router.push("/search");
      } else {
        alert(data.detail || "Failed to create account.");
      }
    } catch (error) {
      alert("Failed to create account.");
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
            className="text-white bg-white/10 px-4 py-2 rounded-full font-semibold"
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>
        </div>
        <h2 className="text-white text-2xl font-semibold mb-6">
          Create an account
        </h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center bg-gray-800 rounded-md px-4 py-3 mb-4">
          <FiMail className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="flex items-center bg-gray-800 rounded-md px-4 py-3 mb-4">
          <FaFlagUsa className="text-gray-400 mr-3" />
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-2 py-1 mr-2 outline-none w-0.4"
          >
            {countryCodes.map((country, idx) => (
              <option
                key={country.code + country.name + idx}
                value={country.code}
              >
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="(775) 351-6501"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />

        <button
          onClick={handleCreateAccount}
          className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition mb-4"
        >
          Create an account
        </button>

        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our{" "}
          <span className="underline">Terms & Service</span>
        </p>
      </div>
    </div>
  );
}
