'use client'
import { Copy, Loader, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useGetBotsQuery } from "@/store/api/botsApi";
import { useState } from "react";

const BotCard = () => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isBotLoading, setIsBotLoading] = useState(false);
  const { data: bots, isLoading } = useGetBotsQuery();
  console.log(bots);
  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };


  const handleTest = (bot: any) => {
    setIsBotLoading(true);
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
    script.setAttribute("data-bot-id", `${bot._id}`);
    document.body.appendChild(script);
    setIsBotLoading(false);
  };

    return (
        <div className="grid gap-6">
        {bots?.map(bot => (
          <div key={bot._id} className="bg-white rounded-xl shadow flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-gray-100">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full mr-2 ${bot.deployUrl ? "bg-green-500" : "bg-yellow-400"}`} />
                <div className="font-semibold text-lg text-gray-800">{bot.name}</div>
                <span className={`ml-3 text-xs px-2 py-0.5 rounded ${bot.deployUrl ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {bot.deployUrl ? "Deployed" : "Pending"}
                </span>
              </div>
              {bot.deployUrl && (
                <div className="mt-1 text-xs font-mono text-indigo-70 bg-gray-900 text-green-400 px-3 py-2 rounded-lg select-all w-full md:w-fit flex items-start justify-between gap-2">
                  <code className="whitespace-pre-wrap">
                    {`<script 
src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js" 
data-bot-id="${bot._id}">
</script>`}
                  </code>
                  <button
                    title="Copy Script"
                    className="ml-2 p-1 rounded hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() =>
                      handleCopy(
                        bot._id,
                        `<script src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js" data-bot-id="${bot._id}"></script>`
                      )
                    }
                  >
                    {copiedId === bot._id ? (
                      <span className="text-green-400 font-semibold text-xs">Copied!</span>
                    ) : (
                      <Copy className="h-4 w-4 text-indigo-300" />
                    )}
                  </button>
                </div>
              )}

            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {bot.deployUrl && <Button className="cursor-pointer" onClick={() => handleTest(bot)} size="sm" variant="default">{isBotLoading ? <Loader className="animate-spin" /> : "Test"}</Button>}
              {/* <Button size="sm" variant="outline" disabled>View</Button> */}
              <Button size="sm" variant="secondary" disabled>Edit</Button>
              <Button size="sm" variant="destructive" disabled>Delete</Button>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-center items-center h-full">
          <Loader size={24} className="animate-spin" />
        </div>}
      </div>
    )
}

export default BotCard
