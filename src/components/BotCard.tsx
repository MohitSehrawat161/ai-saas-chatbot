'use client'
import { Copy, Loader2, Check, Play, Edit, Trash2, Bot } from "lucide-react"
import { Button } from "./ui/button"
import { BotResponse, useDeleteBotMutation, useGetBotsQuery } from "@/store/api/botsApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { setBotName, setBotAvatar, setBotColor, setDomain, setSystemPrompt, setAvatarId, setSteps, setDescription, setSelectedRole, resetCustomChatbot, setIsEditing, setEditBotId } from "@/store/slices/customChatbotSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const BotCard = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isBotLoading, setIsBotLoading] = useState<string | null>(null); // Track which bot is loading
  const [loadedBotId, setLoadedBotId] = useState<string | null>(null); // Track which bot script is currently loaded
  const { data: bots, isLoading, refetch } = useGetBotsQuery();
  const [deleteBot, { isLoading: isDeleting }] = useDeleteBotMutation();
  const [testedBotId, setTestedBotId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const removeChatbotScript = () => {
    // Remove the chatbot script if it exists
    const existingScript = document.querySelector(
      `iframe[id="chatbot-widget-iframe"]`
    );
   
    if (existingScript) {
      existingScript.remove();
      setLoadedBotId(null);
    }
  };

  useEffect(()=>{
    return () => {
      removeChatbotScript();
    };
  },[])

  const handleTest = async (bot: any) => {
    setIsBotLoading(bot._id); // Set loading state for specific bot
    
    try {
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
      
      // Track which bot script is currently loaded
      setLoadedBotId(bot._id);
      
      // Simulate some loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestedBotId(bot._id);
      
    } catch (error) {
      console.error('Error testing bot:', error);
    } finally {
      setIsBotLoading(null); // Clear loading state
    }
  };


  

  const handleEdit = (bot: BotResponse) => {
    dispatch(setBotName(bot.name));
    dispatch(setBotAvatar(bot.botAvatar));
    dispatch(setBotColor(bot.themeColor));
    dispatch(setDomain(bot.domain));
    dispatch(setSystemPrompt(bot.systemPrompt));
    dispatch(setSelectedRole(bot.botRole));
    dispatch(setSteps(1));
    dispatch(setIsEditing(true));
    dispatch(setEditBotId(bot._id));
    router.push("/create-bot");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-lg">Loading your chatbots...</span>
        </div>
      </div>
    );
  }

  if (!bots || bots.length === 0) {
    return (
      <div className="text-center py-2">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <Bot className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No chatbots yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Create your first chatbot to get started</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (bot: any) => {
    try {
      await deleteBot(bot._id);
      toast.success('Bot deleted successfully');
      removeChatbotScript();
      dispatch(resetCustomChatbot());
      // Refetch the bot list to update the UI
      refetch();
    } catch (error) {
      console.error('Error deleting bot:', error);
      toast.error('Failed to delete bot');
    }
  };

  return (
    <div className="grid gap-6">
      {bots?.map(bot => (
        <div 
          key={bot._id} 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200 overflow-hidden"
        >
          <div className="p-6">
            {/* Bot Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span 
                  className={`h-3 w-3 rounded-full ${
                    bot.deployUrl ? "bg-emerald-500" : "bg-amber-500"
                  }`} 
                />
                <div className="font-bold text-xl text-gray-900 dark:text-white">
                  {bot.name}
                </div>
                <span 
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    bot.deployUrl 
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" 
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {bot.deployUrl ? "Deployed" : "Pending"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {bot.deployUrl && (
                  <Button 
                    onClick={() => handleTest(bot)} 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-4 min-w-20 rounded-lg transition-all duration-200 hover:scale-105 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isBotLoading === bot._id || testedBotId === bot._id}
                  >
                    {isBotLoading === bot._id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Play className="h-2 w-2" />
                    )}
                    {isBotLoading === bot._id ? "Loading..." : "Test"}
                  </Button>
                )}
              
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={()=>handleEdit(bot)}
                  className="px-4 py-2 rounded-lg border-gray-200 dark:border-gray-600 text-gray-900 hover:bg-gray-200 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <Button 
                onClick={()=>handleDelete(bot)}
                  size="sm" 
                  variant="outline" 
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg border-red-200 dark:border-gray-600 hover:bg-red-600 hover:scale-105 hover:text-white text-white bg-red-500 dark:bg-gray-700/50"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>

            {/* Script Snippet */}
            {bot.deployUrl && (
              <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 border border-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300 dark:text-gray-400">
                    Embed Script
                  </span>
                  <Button
                    onClick={() =>
                      handleCopy(
                        bot._id,
                        `<script src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js" data-bot-id="${bot._id}"></script>`
                      )
                    }
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gray-800 dark:hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-200"
                  >
                    {copiedId === bot._id ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="relative">
                  <code className="text-sm text-emerald-400 font-mono bg-gray-800 dark:bg-gray-900 rounded-lg p-3 block overflow-x-auto">
                    {`<script 
  src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js" 
  data-bot-id="${bot._id}">
</script>`}
                  </code>
                  
                  {/* Copy Success Message */}
                  {copiedId === bot._id && (
                    <div className="absolute -top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full animate-in fade-in duration-200">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bot Info Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Bot ID: {bot._id}</span>
                {bot.deployUrl && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Ready to embed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotCard;
