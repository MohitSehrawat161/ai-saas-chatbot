"use client";
import { ReactNode, useState } from "react";
import { GrDeploy } from "react-icons/gr";
import Cookies from 'js-cookie'
import { baseApi } from "@/store/api";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Bot,
  MessageSquare,
  Settings,
  Menu,
  User,
  Upload,
  ChevronDown,
  LogOut,
  Bell,
  Search,
  Edit
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useGetUserQuery } from "@/store/api/botsApi";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

function Avatar({ name }: { name: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
    dispatch(baseApi.util.resetApiState());
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative cursor-pointer">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
          {initials}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
          }`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute  right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700/50 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
            {/* <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p> */}
          </div>

          <button
            onClick={handleLogout}
            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function TopBar({ title }: { title?: string }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: user } = useGetUserQuery();
  return (
    <header
      className={`flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-700/50 fixed top-0 z-20 transition-all duration-300 ${isCollapsed ? 'left-16 lg:left-10' : 'left-62 lg:left-64'
        } right-0`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </SidebarTrigger>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">{title || "ChatBot"}</div>
      </div>

      <div className="flex items-center gap-4 cursor-pointer">
        {/* Search Icon */}
        <Avatar name={user?.username || ""} />
      </div>
    </header>
  );
}

function LayoutContent({ children, title }: LayoutProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <main className="flex-1 flex-col min-h-screen">
      <TopBar title={title} />
      <div
        className={`flex-1 p-2 lg:px-6 lg:py-2 mt-20 transition-all duration-300 `}
      >
        {children}
      </div>
    </main>
  );
}

function SidebarHeaderContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={`${isCollapsed ? "py-4" : 'p-4'} mr-2`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="ChatPilot" width={40} height={40} className="rounded-lg" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 dark:text-white">ChatBot</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">AI Chatbot Platform</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarMenuContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  const { planType } = useSelector((state: any) => state.user);

  const menuItems = [
    {
      href: "/dashboard",
      icon: BarChart3,
      label: "Dashboard",
      tooltip: "Dashboard"
    },
    {
      href: "/create-chatbot",
      icon: Bot,
      label: "Create ChatBot",
      tooltip: "Create ChatBot"
    },
    {
      href: "/edit-chatbot",
      icon: Edit,
      label: "Edit ChatBot",
      tooltip: "Edit ChatBot"
    },
    {
      href: "/my-chatbots",
      icon: MessageSquare,
      label: "My ChatBots",
      tooltip: "My ChatBots"
    },
  ];

  return (
    <SidebarMenu className="w-full space-y-1">
      {menuItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={index} className="w-full">
            <SidebarMenuButton
              asChild
              tooltip={item.tooltip}
              className={`w-full transition-all duration-200 mr-2 ${isActive
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400  '
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                }`}
            >
              <Link
                href={item.href}
                className={`font-medium flex items-center gap-3 px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''
                  }`}
              >
                <IconComponent className={`h-5 w-5  ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                {!isCollapsed && (
                  <span className={`${isActive ? 'font-semibold' : 'font-medium'
                    }`}>
                    {item.label}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export default function Layout({ children, title }: LayoutProps) {
  const pathname = usePathname();
  
  // Check if current page is login or signup
  const isAuthPage = pathname === '/login' || pathname === '/sign-up';
  
 
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937] w-full">
        <Sidebar
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border-r border-gray-100 dark:border-gray-700/50 fixed left-0 top-0 h-full z-30"
          collapsible="icon"
        >
          <SidebarHeader>
            <SidebarHeaderContent />
          </SidebarHeader>
          <SidebarContent className="px-2 py-4">
            <SidebarMenuContent />
          </SidebarContent>
        </Sidebar>
        <LayoutContent title={title}>
          {children}
        </LayoutContent>
      </div>
    </SidebarProvider>
  );
} 
