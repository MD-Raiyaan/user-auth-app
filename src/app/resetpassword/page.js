"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/helpers/Loader";

export default function Resetpassword() {
  const [password, setpassword] = React.useState("");
  const [loader, setloader] = React.useState(false);
  const [buttondisabled, setbuttondisabled] = React.useState(true);
  const [token, setToken] = React.useState("");
  const router = useRouter();

  const [error, seterror] = React.useState(false);

  React.useEffect(() => {
    const tempToken = window.location.search.split("=")[1];
    console.log(tempToken);
    if (!tempToken || tempToken.length==0) {
      seterror(true);
    } else {
      setToken(tempToken);
    }
  }, []);

  React.useEffect(() => {
    if (password.length > 0) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [password]);

  const onChange = async () => {
    const toastId = toast.loading("processing...");
    try {
      setloader(true);
      const response = await axios.post("/api/users/resetpassword",{token,password});
      if (response.data.error != undefined)
        throw new Error(response.data.error);
      toast.success("password changed successfully !!!", { id: toastId });
      router.push("/login");
    } catch (error) {
      seterror(true);
      toast.error(error.message, { id: toastId });
    } finally {
      setloader(false);
    }
  };
  if(error==true){
     return (
      <div className="w-full h-screen flex justify-center items-center bg-red-100">
        <div className="text-red-700 font-bold text-center p-5 border-2 border-red-400 rounded-md shadow-md bg-white">
          <h2 className="text-xl mb-2">❌ Error</h2>
          <p>Something went wrong</p>
          <Link href="/login" className="underline text-blue-500 block mt-4">
            Go back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-80 h-auto  border-2 p-3">
        {loader && <Loader />}
        <h1 className="text-center text-2xl font-bold font-serif mx-2 my-1">
          Reset password
        </h1>
        <hr className="m-1" />
        <input
          className="bg-slate-200 text-black px-3 py-2  text-lg  rounded-md m-1"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter the new password "
        />
        <button
          className="bg-blue-400 hover:bg-blue-300 text-black font-bold text-center p-1 mx-1 my-2 rounded-md"
          disabled={buttondisabled}
          onClick={onChange}
        >
          {buttondisabled ? "Invalid password" : "Change"}
        </button>
      </div>
    </div>
  );
}
