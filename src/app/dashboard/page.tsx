"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Layout from "@/components/layout";
import { Settings, BarChart3 } from "lucide-react";
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">

      <div

        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow p-6 flex flex-col items-center"
      >
        <div className="text-2xl font-bold text-indigo-700 mb-1">{bots?.length}</div>
        <div className="text-gray-600 text-sm font-medium">Total Bots</div>
      </div>

      <div

        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow p-6 flex flex-col items-center"
      >
        <div className="text-2xl font-bold text-indigo-700 mb-1">0</div>
        <div className="text-gray-600 text-sm font-medium">Total Messages</div>
      </div>

      <div

        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow p-6 flex flex-col items-center"
      >
        <div className="text-2xl font-bold text-indigo-700 mb-1">0</div>
        <div className="text-gray-600 text-sm font-medium">Total End Users</div>
      </div>

    </div>
  );
}

// function BotCard({ bot }: { bot: typeof bots[0] }) {
//   const [copied, setCopied] = useState(false);
//   return (
//     <div className="bg-white rounded-xl shadow flex flex-col md:flex-row items-start md:items-center justify-between p-5 mb-4 gap-4 border border-gray-100">
//       <div className="flex items-center gap-3">
//         <span
//           className={`h-3 w-3 rounded-full mr-2 ${
//             bot.status === "active" ? "bg-green-500" : "bg-gray-400"
//           }`}
//         />
//         <div className="font-semibold text-lg text-gray-800">{bot.name}</div>
//         <span className="ml-3 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
//           {bot.status === "active" ? "Active" : "Inactive"}
//         </span>
//       </div>
//       <div className="flex items-center gap-6 flex-wrap">
//         <div className="flex items-center gap-1 text-gray-600">
//           <span className="text-sm">Today's Messages:</span>
//           <span className="font-semibold text-indigo-600">{bot.todayMessages}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <button title="Settings" className="hover:text-indigo-600 transition-colors">
//             <Settings className="h-5 w-5" />
//           </button>
//           <button title="Analytics" className="hover:text-indigo-600 transition-colors">
//             <BarChart3 className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-xs font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200 select-all">
//             {bot.api}
//           </span>
//           <Button
//             type="button"
//             size="sm"
//             variant="outline"
//             className="px-2 py-1 text-xs"
//             onClick={() => {
//               navigator.clipboard.writeText(bot.api);
//               setCopied(true);
//               setTimeout(() => setCopied(false), 1200);
//             }}
//           >
//             {copied ? "Copied!" : "Copy"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
      <p className="text-gray-600 mb-4">Here's a quick overview of your activity.</p>
      {/* Deployment Type Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-gray-700">Deployment Type:</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" checked className="accent-indigo-600" readOnly />
              <span className="text-indigo-700 font-semibold">Shared (Free) - Shared infrastructure</span>
            </label>
            <label className="flex items-center gap-2 opacity-60 cursor-not-allowed">
              <input disabled type="radio" className="accent-gray-400" readOnly />
              <span className="text-gray-500">Premium (Pro) - Dedicated deployment</span>
            </label>
          </div>
        </div>
        <div className="text-sm text-gray-600 font-medium mt-2 md:mt-0 flex flex-col items-end gap-1">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Free plan includes 1 chatbot</span>
        </div>
      </div>

      {/* Plans Callout Section */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-full  relative bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl shadow-lg px-8 py-5 flex flex-col items-center border-2 border-transparent bg-clip-padding" >
          {/* <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow text-indigo-700 font-bold text-xs tracking-wide border border-indigo-200 animate-pulse">Unlock More Features!</div> */}
          <div className="mb-2 text-base text-gray-700 font-semibold text-center">Upgrade to Pro for dedicated deployments, more bots, and advanced analytics.</div>
          <a
            href="#"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors mt-2 group text-lg"
          >
            <span>Visit our website for plans</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce group-hover:animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7h-6m6 0v6" /></svg>
          </a>
        </div>
      </div>

      <OverviewCards />
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Chatbots</h3>
        <BotCard />
      </div>
      {/* Floating Create New Bot Button */}
      <Link href="/create-bot">
        <Button
          className="fixed bottom-8 right-8 z-50 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg px-6 py-3 rounded-full hover:scale-105 transition-transform"
          size="lg"
        >
          + Create New Bot
        </Button>
      </Link>
    </Layout>
  );
};

export default DashboardPage;
