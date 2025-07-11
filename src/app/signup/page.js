"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/helpers/Loader";

export default function Signup() {
  const [user, setuser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loader,setloader]=React.useState(false);
  const [buttondisabled,setbuttondisabled]=React.useState(true);
  const router=useRouter();

  React.useEffect(()=>{ 
      if(user.username.length>0 && user.email.length>0 && user.password.length>0){
         setbuttondisabled(false);
      }else{
         setbuttondisabled(true);
      }
  },[user]);

  const onSignup = async () => {
       const toastId=toast.loading("processing...");
       try {
         setloader(true);
         await axios.post('/api/users/signup',user);
         toast.success('Signed up successfully !!!',{id:toastId});
         router.push('/verifyemail');
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
        <h1 className="text-center text-2xl font-bold font-serif mx-2 my-1">
           Signup
        </h1>
        <hr className="m-1" />
        <input
          className="bg-slate-200 text-black px-3 py-2  text-lg  rounded-md m-1"
          name="username"
          type="text"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          placeholder="Enter the username "
        />
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
        <button className="bg-blue-400 hover:bg-blue-300 text-black font-bold text-center p-1 mx-1 my-2 rounded-md"
          disabled={buttondisabled}
          onClick={onSignup}
        >
          {(buttondisabled)?"No Signup":"Signup"}
        </button>
        <p className="text-center m-1">
          Do not have an account ?{" "}
          <Link href="/login" className="underline decoration-sky-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
