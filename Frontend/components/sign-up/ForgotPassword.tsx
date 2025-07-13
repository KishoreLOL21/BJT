"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState<"verify" | "reset">("verify");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!userName) {
      toast.error("Please enter your username.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User verified. Please reset your password.");
        setStage("reset");
      } else {
        toast.error(data.detail || "User not found.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password updated successfully.");
        router.push("/search"); 
      } else {
        toast.error(data.detail || "Failed to reset password.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={stage === "verify" ? handleVerify : handleResetPassword}
        className="bg-black/80 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-white text-2xl font-semibold mb-6">
          {stage === "verify" ? "Forgot Password" : "Reset Password"}
        </h2>

        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={stage === "reset"}
          className="w-full mb-6 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />

        {stage === "reset" && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Re-type password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
        >
          {loading ? "Submitting..." : stage === "verify" ? "Verify" : "Save"}
        </button>
      </form>
    </div>
  );
}
