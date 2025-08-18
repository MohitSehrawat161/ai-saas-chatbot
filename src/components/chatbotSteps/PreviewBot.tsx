"use client";

import { useDispatch, useSelector } from "react-redux";
import { Globe, Loader, Bot } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { setSteps } from "@/store/slices/customChatbotSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateBotMutation } from "@/store/api/botsApi";
import { useRouter } from "next/navigation";

const PreviewBot = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        botName,
        botAvatar,
        color,
        description,
        domain,
        systemPrompt,
        role,
        personality,
        selectedRole,
        avatarId,
        
    } = useSelector((state: any) => state.customChatbot);

    const { planType } = useSelector((state: any) => state.user);

    const [createBot, { isLoading }] = useCreateBotMutation();
    const [isCreatingBot, setIsCreatingBot] = useState(false);

    const handleNext = async () => {
        setIsCreatingBot(true);
        try {
            const response = await createBot({
                name: botName,
                domain: domain,
                systemPrompt: systemPrompt,
                modelProvider: "openai",
                modelType: "gpt-4o",
                temperature: 0.1,
                memoryEnabled: true,
                language: "en",
                memberShip: planType,
                description: description,
                avatarId: avatarId,
                themeColor: color,
                botRole: selectedRole,
            }).unwrap();

            console.log(response);
            toast.success("Chatbot created successfully");
            dispatch(setSteps(1));
            router.push("/my-bots");
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to create bot");
        } finally {
            setIsCreatingBot(false);
        }
    };

    return (
        <div className="mx-auto w-full p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 flex flex-col min-h-[calc(100vh-8rem)]">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
                {botAvatar ? (
                    <img
                        src={botAvatar}
                        alt={botName || "Bot Avatar"}
                        className="rounded-full border-4 shadow object-cover w-24 h-24"
                        style={{ borderColor: color || "#6366f1" }}
                        
                    />
                ) : (
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 shadow"
                        style={{
                            backgroundColor: color || "#6366f1",
                            borderColor: color || "#6366f1",
                        }}
                    >
                        {botName?.charAt(0) || "B"}
                    </div>
                )}
            </div>

            {/* Bot Info */}
            <div className="text-center">
                <h2 className="text-2xl flex items-center gap-2 justify-center font-semibold text-gray-900 dark:text-gray-100">
                    <Bot className="w-4 h-4" />  {botName || "Unnamed Bot"}
                </h2>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Globe className="w-4 h-4" />
                    <span>{domain || "No domain provided"}</span>
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    <strong>Description:</strong>  {description || "No description provided yet."}
                </p>
            </div>

            {/* Extra Bot Details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="p-4 rounded-xl bg-gray-100 dark:bg-neutral-800 flex flex-col">
                    <span className="text-xs text-gray-500">Role</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {selectedRole || "Not set"}
                    </span>
                </div>

                <div className="p-4 rounded-xl bg-gray-100 dark:bg-neutral-800 flex flex-col">
                    <span className="text-xs text-gray-500">System Prompt</span>
                    <span title={systemPrompt} className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 cursor-pointer">
                        {systemPrompt || "No system prompt"}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex justify-end gap-3 pt-8">
                <Button
                    className="bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    onClick={() => dispatch(setSteps(3))}
                >
                    Back
                </Button>
                <Button
                    className="w-32"
                    onClick={handleNext}
                    disabled={isCreatingBot || isLoading}
                >
                    {isCreatingBot || isLoading ? (
                        <Loader className="animate-spin w-4 h-4" />
                    ) : (
                        "Create Chatbot"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default PreviewBot;
