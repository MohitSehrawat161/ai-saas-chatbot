"use client";
import { ReactNode } from "react";
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
  Upload
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
      {initials}
    </div>
  );
}

function TopBar({ title }: { title?: string }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
    dispatch(baseApi.util.resetApiState());

  };

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 bg-white shadow-sm fixed top-0 z-10 transition-all duration-200 ${isCollapsed ? 'left-12 right-0' : 'left-64 right-0'
        }`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <Menu className="h-5 w-5 text-gray-600" />
        </SidebarTrigger>
        <div className="text-lg font-semibold text-gray-800">{title || "ChatPilot"}</div>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handleLogout}>Logout</Button>
        <Avatar name="John Doe" />
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
        className={`flex-1 p-6 md:p-10 mt-16 transition-all duration-300 m-auto`}
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
    <div className="">
      <div className="text-xl font-bold flex items-center tracking-tight">
        <img src="/logo.png" alt="ChatPilot" width={70} height={100} />
        {!isCollapsed && (
          <span className="text-2xl mr-5 relative left-[-10px] ml-4">ChatBot</span>
        )}
      </div>
    </div>
  );
}

function SidebarMenuContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { planType } = useSelector((state: any) => state.user);
  const menuItems = [
    {
      href: "/dashboard",
      icon: BarChart3,
      label: "Dashboard",
      tooltip: "Dashboard"
    },
    // {
    //   href: "/llm-settings",
    //   icon: Settings,
    //   label: "LLM Settings",
    //   tooltip: "LLM Settings"
    // },
    // {
    //   href: "/rag-config",
    //   icon: BarChart3,
    //   label: "RAG Configuration",
    //   tooltip: "RAG Configuration"
    // },
    // {
    //   href: "/doc-upload",
    //   icon: Upload,
    //   label: "Knowledge Base ",
    //   tooltip: "Document Upload"
    // },
    {
      href: "/create-bot",
      icon: Bot,
      label: "Create Bot",
      tooltip: "Create Bot"
    },
    {
      href: "/my-bots",
      icon: MessageSquare,
      label: "My Bots",
      tooltip: "My Bots"
    },
    // {
    //   href: "#",
    //   icon: Settings,
    //   label: "Settings",
    //   tooltip: "Settings"
    // }
  ];

  return (
    <SidebarMenu className="w-full rounded-lg">
      {menuItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <SidebarMenuItem key={index} className="w-full ">
            <SidebarMenuButton asChild tooltip={item.tooltip} className={`hover:bg-gray-200 ${item.href === '/rag-config' && planType === "free" ? 'hidden' : ''}`}>
              <Link href={item.href} className={`font-medium flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
                <IconComponent className="h-5 w-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <SidebarProvider >
      <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200 w-full">
        <Sidebar className="bg-white/90 shadow-xl fixed left-0 top-0 h-full" collapsible="icon">
          <SidebarHeader>
            <SidebarHeaderContent />
          </SidebarHeader>
          <SidebarContent className="px-2">
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
