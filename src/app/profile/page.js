"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.error) throw new Error(response.data.error);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      if (response.data.error) throw new Error(response.data.error);
      setUser(response.data.data);
      toast.success("User data loaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center px-4">
      <div className="bg-gray-900 text-white shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">👤 Profile</h1>
        <hr className="border-gray-700" />

        {/* USER INFO CARD */}
        {user ? (
          <div className="bg-gray-800 rounded-xl p-4 shadow-md space-y-2">
            <p className="text-lg">
              <span className="font-semibold text-blue-400">Username:</span>{" "}
              {user.username}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold">Verified:</span>{" "}
              {user.isVerified ? "✅ Yes" : "❌ No"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-center text-gray-400">
            Loading user data...
          </p>
        )}


        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={logout}
            className="flex-1 bg-red-500 hover:bg-red-400 transition text-white font-semibold py-2 rounded-md"
          >
            Logout
          </button>
          <button
            onClick={getDetails}
            className="flex-1 bg-green-500 hover:bg-green-400 transition text-black font-bold py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* PROFILE LINK */}
        {user && (
          <p className="text-center text-sm text-gray-400">
            Visit public profile:{" "}
            <Link
              href={`/profile/${user.username}`}
              className="text-blue-500 underline hover:text-blue-300"
            >
              /profile/{user.username}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
