"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authApi";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'



export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await login(userInfo).unwrap();
      console.log(response);
      toast.success("Login successful");
      Cookies.set("token", response.accessToken);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 justify-center bg-gradient-to-br ">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl flex flex-col items-center">
        {/* <img
          src="/logo.png"
          alt="Company Logo"
          width={150}
          height={48}
          className="mb-4"
        /> */}
        <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">
          Login to Deploy Your AI ChatBot
        </h1>
        <p className="text-gray-600 mb-6 text-center text-base">
          Manage, customize, and embed powerful bots in seconds.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-white"
          />
          <Input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-white"
          />
          <Button type="submit" className="w-full mt-2">
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Login"}
          </Button>
        </form>
        <div className="w-full flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        {/* <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          Login with Google
        </Button> */}
        <p className="text-sm text-gray-600 text-center">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
