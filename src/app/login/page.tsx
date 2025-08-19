"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authApi";
import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937] flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Login to deploy and manage your AI chatbots
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 border-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 border-gray-200 dark:border-gray-600 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                or
              </span>
            </div>
          </div>

          {/* Social Login Button (Optional) */}
          {/* <Button 
            variant="outline" 
            className="w-full h-11 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </div>
          </Button> */}

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                href="/sign-up" 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/forgot-password" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
