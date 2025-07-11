"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (!response.data?.success) {
        throw new Error(response.data.error);
      }
      setVerified(true);
      toast.success(response.data.message);
    } catch (error) {
      setError(true);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const search = window.location.search.split("=");
    const token = search[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verify();
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white rounded-xl shadow-xl p-6 w-full max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold">📧 Email Verification</h1>

        <div className="text-sm text-gray-400 break-all">
          Token: {token || "No token provided"}
        </div>

        {verified && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <CheckCircle className="text-green-400 w-10 h-10" />
            <p className="text-lg font-semibold text-green-300">
              Email verified successfully!
            </p>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md mt-2 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <XCircle className="text-red-500 w-10 h-10" />
            <p className="text-lg font-semibold text-red-400">
              Verification failed.
            </p>
            <Link
              href="/"
              className="underline text-blue-400 hover:text-blue-300 text-sm"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
