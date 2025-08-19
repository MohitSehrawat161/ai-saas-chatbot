"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Layout from "@/components/layout";
import { Settings, BarChart3, Copy, Check, ArrowRight, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import BotCard from "@/components/BotCard";
import { useGetBotsQuery } from "@/store/api/botsApi";

const bots = [
  {
    name: "Customer Support Bot",
    status: "active",
    todayMessages: 42,
    api: "https://api.chatpilot.ai/bot/1234",
  },
  {
    name: "Sales Assistant Bot",
    status: "inactive",
    todayMessages: 0,
    api: "https://api.chatpilot.ai/bot/5678",
  },
];

const overview = [
  { label: "Total Bots", value: 2 },
  { label: "Total Messages", value: 1245 },
  { label: "Total End Users", value: 312 },
];

function OverviewCards() {
  const { data: bots, isLoading } = useGetBotsQuery();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-200">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {bots?.length || 0}
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Bots</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-200">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">0</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Messages</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-200">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">0</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total End Users</div>
      </div>
    </div>
  );
}

function DeploymentTypeCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="font-semibold text-gray-700 dark:text-gray-300 text-lg">Deployment Type:</span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="flex items-center gap-3">
              <input 
                type="radio" 
                checked 
                className="accent-indigo-600 w-4 h-4" 
                readOnly 
              />
              <span className="text-indigo-700 dark:text-indigo-400 font-semibold">
                Shared (Free) - Shared infrastructure
              </span>
            </label>
            <label className="flex items-center gap-3 opacity-60 cursor-not-allowed">
              <input 
                disabled 
                type="radio" 
                className="accent-gray-400 w-4 h-4" 
                readOnly 
              />
              <span className="text-gray-500 dark:text-gray-400">
                Premium (Pro) - Dedicated deployment
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-sm font-medium">
            Free plan includes 1 chatbot
          </span>
        </div>
      </div>
    </div>
  );
}

function UpgradeCallout() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">
          Unlock Premium Features
        </h3>
        <p className="text-indigo-100 text-lg">
          Upgrade to Pro for dedicated deployments, unlimited bots, and advanced analytics.
        </p>
      </div>
      <Button
        className="bg-white text-indigo-600 hover:bg-gray-50 hover:scale-105 transition-all duration-200 px-6 py-3 text-lg font-semibold rounded-full shadow-lg"
        size="lg"
      >
        <span>View Plans</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

function ChatbotList() {
  const [copiedBot, setCopiedBot] = useState<string | null>(null);

  const handleCopyApi = async (api: string, botName: string) => {
    try {
      await navigator.clipboard.writeText(api);
      setCopiedBot(botName);
      setTimeout(() => setCopiedBot(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      {bots.map((bot, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Bot Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${
                    bot.status === "active" ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                />
                <div className="font-semibold text-xl text-gray-900 dark:text-white">
                  {bot.name}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  bot.status === "active" 
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}>
                  {bot.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Today's Messages */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="text-sm">Today's Messages:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {bot.todayMessages}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  title="Settings" 
                  className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button 
                  title="Analytics" 
                  className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
                >
                  <BarChart3 className="h-5 w-5" />
                </button>
              </div>

              {/* API Endpoint */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 select-all">
                  {bot.api}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="px-3 py-2 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
                  onClick={() => handleCopyApi(bot.api, bot.name)}
                >
                  {copiedBot === bot.name ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <div className="min-h-screen rounded-xl bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8 ">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome back, John! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Here's a quick overview of your activity.
            </p>
          </div>

          {/* Deployment Type Card */}
          <DeploymentTypeCard />

          {/* Upgrade Callout */}
          <UpgradeCallout />

          {/* Overview Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Overview
            </h2>
            <OverviewCards />
          </div>

          {/* Chatbots Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Chatbots
            </h2>
            {/* <ChatbotList /> */}
            <BotCard/>
          </div>
        </div>

        {/* Floating Action Button */}
      {bots?.length < 1 && <Link href="/create-bot">
          <Button
            className="fixed w-48 bottom-8 right-8 z-50 shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-md  py-4 rounded-full hover:scale-105 transition-all duration-200 border-0"
            size="lg"
          >
            <PlusCircle className="h-6 w-6" />
            Create ChatBot
          </Button>
        </Link>}
      </div>
    </Layout>
  );
};

export default DashboardPage;
