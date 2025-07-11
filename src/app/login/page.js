"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import Loader from "@/helpers/Loader";


export default function Login() {
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });
  const [loader,setloader]=React.useState(false);
  const [buttondisabled, setbuttondisabled] = React.useState(true);
  const [reset,setreset]=React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [user]);

  const mail=async ()=>{
       const toastId=toast.loading("sending a verification mail...");
       try{
          setloader(true);
          const response=await axios.post('/api/users/resethelper',{email:user.email});
          if(response.data.error!=undefined)throw Error(response.data.error);
          toast.success("Mail has been send successfully !!! ", {
            id: toastId,
          });
          window.location.reload();
       }catch(error){
          toast.error(error.message, { id: toastId });
       }finally{
          setloader(false);
       }
  }
  
  const onlogin = async () => {
    const toastId = toast.loading("processing...");
    try {
      setloader(true);
      const response=await axios.post("/api/users/login", user);
      if(response.data.error!=undefined)throw new Error(response.data.error);
      toast.success("loggedin successfully !!!",{id:toastId});
      router.push("/profile");
    } catch (error) {
      toast.error(error.message,{id:toastId});
    }finally{
      setloader(false);
    } 
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-80 h-auto  border-2 p-3">
        {loader && <Loader />}
        {reset ? (
          <>
            <h1 className="text-center text-2xl font-bold font-serif mx-2 my-1">
               Reset password
            </h1>
            <hr className="m-1" />
            <input
              className="bg-slate-200 text-black px-3 py-2  text-lg  rounded-md m-1"
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              placeholder="Enter the email "
            />
            <button
              className="bg-blue-400 hover:bg-blue-300 text-black font-bold text-center p-1 mx-1 my-2 rounded-md"
              onClick={mail}
            >
              Reset 
            </button>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-bold font-serif mx-2 my-1">
              Login
            </h1>
            <hr className="m-1" />
            <input
              className="bg-slate-200 text-black px-3 py-2  text-lg  rounded-md m-1"
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              placeholder="Enter the email "
            />
            <input
              className="bg-slate-200 text-black px-3 py-2  text-lg  rounded-md m-1"
              name="password"
              type="password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              placeholder="Enter the password "
            />
            <button
              className="bg-blue-400 hover:bg-blue-300 text-black font-bold text-center p-1 mx-1 my-2 rounded-md"
              disabled={buttondisabled}
              onClick={onlogin}
            >
              {buttondisabled ? "No Login" : "Login"}
            </button>
            <p className="text-center m-1">
              Do not have an account ?{" "}
              <Link href="/signup" className="underline decoration-sky-400 ">
                Signup
              </Link>
            </p>
            <p
              className="text-center m-1 underline decoration-sky-400  hover:decoration-red-500 cursor-pointer"
              onClick={() => setreset(true)}
            >
              forgot password
            </p>
          </>
        )}
      </div>
    </div>
  );
}
