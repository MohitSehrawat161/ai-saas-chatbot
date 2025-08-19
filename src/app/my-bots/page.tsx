'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Copy, Loader2, Loader } from "lucide-react";
import { useGetBotsQuery } from "@/store/api/botsApi";
import { Bot, PlusCircle } from "lucide-react";
import BotCard from "@/components/BotCard";
import Link from "next/link";

const dummyBots = [
  { id: "bot1", name: "Customer Support Bot", status: "deployed", url: "https://api.chatpilot.ai/bot/1234" },
  { id: "bot2", name: "Sales Assistant Bot", status: "pending" },
  { id: "bot3", name: "FAQ Helper Bot", status: "deployed", url: "https://api.chatpilot.ai/bot/5678" },
];

const BotsPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { data: bots, isLoading } = useGetBotsQuery();
  console.log(bots);
  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };


  const handleTest = (bot: any) => {
    // Remove existing script if already added (optional, avoids duplicates)
    const existingScript = document.querySelector(
      `script[src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create a new script element
    const script = document.createElement("script");
    script.src = "https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js";
    script.setAttribute("data-bot-id", `${bot.deployUrl+'/'+bot._id}`);
    document.body.appendChild(script);
  };

  return (
    <Layout>
      <div className="max-w-3x p-6 rounded-2xl bg-white mx-auto py-10 mt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Bots</h1>
     
        <BotCard/>
        {bots?.length === 0 && (
          <div className="mt-2 text-center flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-gray-700 mb-4 flex items-center justify-center gap-2">
              <Bot className="w-5 h-5 text-indigo-600" />
              Start creating Chat bot now and bring your ideas to life!
            </p>
            <Link href="/create-bot">
            <Button className="flex items-center gap-2 self-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-200">
              <PlusCircle className="w-4 h-4" />
              Create Bot
            </Button>
            </Link>
          </div>
        )}

      </div>
    </Layout>
  )
}

export default BotsPage 
