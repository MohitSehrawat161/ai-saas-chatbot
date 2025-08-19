'use client'
import { Send, X } from "lucide-react";
import Layout from "@/components/layout";
import { useState } from "react";
import {
    MessageSquare,
    Briefcase,
    Star,
    Calendar,
    Headphones,
    ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotSetupStep2 from "@/components/chatbotSteps/ChatbotSetupStep2";
import ChatbotSetupStep1 from "@/components/chatbotSteps/ChatbotSetupStep1";
import { useDispatch, useSelector } from "react-redux";
import ChatbotSetupStep3 from "@/components/chatbotSteps/ChatbotSetupStep3";
import PreviewBot from "@/components/chatbotSteps/PreviewBot";
import ProgressSteps from "@/components/ProgressSteps";
const steps2 = [
    { id: 1, label: "Bot Details" },
    { id: 2, label: "Bot Role" },
    { id: 3, label: "Knowledge Base" },
    { id: 4, label: "Preview" },
];
const CustomPage = () => {
    // const [steps, setSteps] = useState<number>(1);

    const { selectedRole, description, botName, botAvatar, steps, color } = useSelector((state: any) => state.customChatbot);
    const dispatch = useDispatch();


    return (
        <Layout>
            <ProgressSteps steps={steps2} currentStep={steps} />
            <div className="grid grid-cols-1 md:grid-cols-[5fr_2fr] 2xl:grid-cols-[10fr_2fr]  mx-auto  gap-6  justify-between gap- items-cente h-full">
                {steps === 1 && <ChatbotSetupStep1 />}
                {steps === 2 && <ChatbotSetupStep2 />}
                {steps === 3 && <ChatbotSetupStep3 />}
                {steps === 4 && <PreviewBot />}
                <div className="lg:h-[35rem] h-[25rem] w-[22rem] sticky top-0 max-h-[calc(100vh-200px)]">
                    {/* Chat Interface */}
                    <div
                        className={`transition-all h-full duration-300 ease-in-out`}
                    >
                        <div className=" h-full w-full rounded-3xl shadow-2xl overflow-hidden bg-white flex flex-col border border-gray-200">
                            {/* Header */}
                            <div
                                style={{ backgroundColor: color }}
                                className="text-white p-4 flex items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={botAvatar}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="text-start">
                                        <p className="font-semibold text-start">{botName}</p>
                                        <p className="text-sm text-green-200 font-semibold text-start">{selectedRole}</p>
                                    </div>
                                </div>
                                <button
                                    className="w-8 h-8 cursor-pointer flex justify-center items-center hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-3 space-y-4 overflow-y-auto">

                                <div
                                    className={`flex flex-col`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${"bg-blue-100 "
                                            }`}
                                    >
                                        Hi! I’m {botName}, your virtual assistant. How can I make your day easier?
                                    </div>



                                </div>

                            </div>

                            {/* Input */}
                            <div
                                style={{ borderTop: `1px solid ${color}` }}
                                className="p-3 flex items-center gap-2"
                            >
                                <form className="flex w-full space-x-2" onSubmit={(e) => { e.preventDefault(); }}>
                                    <input
                                        type="text"
                                        placeholder="Enter your message..."
                                        className="flex-1 p-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                        // value={input}
                                        // onChange={(e) => setInput(e.target.value)}
                                        style={{ border: `1px solid ${color}` }}
                                    />
                                    <button
                                        style={{ backgroundColor: color }}
                                        className="w-10 h-10 flex justify-center items-center hover:bg-blue-600 text-white p-2 rounded-full"
                                        type="submit"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                            <p className="bg-[#f1f1f1] text-center p-2 text-xs text-[#00043b] font-thin">Powered by <strong className="font-bold">Binary Informatics</strong></p>
                        </div>
                    </div>



                </div>
            </div>
        </Layout>
    )
}

export default CustomPage
