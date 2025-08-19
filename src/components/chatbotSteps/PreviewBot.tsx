"use client";

import { useDispatch, useSelector } from "react-redux";
import { Globe, Loader, Bot, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { setSteps, resetCustomChatbot } from "@/store/slices/customChatbotSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateBotMutation, useGetUserQuery, useUpdateBotMutation } from "@/store/api/botsApi";
import { useRouter } from "next/navigation";

const PreviewBot = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showFullPrompt, setShowFullPrompt] = useState(false);
    const { data: user } = useGetUserQuery();



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
        editBotId,
        isEditing,
    } = useSelector((state: any) => state.customChatbot);

    const { planType } = useSelector((state: any) => state.user);
    const [createBot, { isLoading }] = useCreateBotMutation();
    const [updateBot, { isLoading: isUpdatingBot }] = useUpdateBotMutation();
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
            dispatch(resetCustomChatbot());
            dispatch(setSteps(1));
            router.push("/my-bots");
        } catch (error: any) {
            console.log(error);
            if (error.data.error) {
                toast.error(error.data.error);
            }
            else {
                toast.error("Failed to create bot");
            }

        } finally {
            setIsCreatingBot(false);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const handleBack = () => {
        if (user?.isKnowledgeBase) {
            dispatch(setSteps(2));
        } else {
            dispatch(setSteps(3));
        }
    }

    const handleUpdateChatbot = async () => {
        try {
            const response = await updateBot({
                id: editBotId,
                data: {
                    name: botName,
                    domain: domain,
                    systemPrompt: systemPrompt,
                    description: description,
                    avatarId: avatarId,
                    themeColor: color,
                    botRole: selectedRole,
                   
                }
            }).unwrap();
            console.log(response);
            toast.success("Chatbot updated successfully");
            dispatch(resetCustomChatbot());
            dispatch(setSteps(1));
            router.push("/my-bots");
        }
        catch (error: any) {
            console.log(error);
            if (error.data.error) {
                toast.error(error.data.error);
            }
        }
    }

    return (
        <div className=" bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937] max-h-[calc(100vh-200px)] overflow-auto">
            <div className="mx-auto">
                {/* Main Confirmation Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-8">
                    {/* Bot Avatar Section */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            {/* Glowing Accent Border */}
                            <div
                                className="absolute inset-0 rounded-full blur-lg opacity-60"
                                style={{
                                    backgroundColor: color || "#6366f1",
                                    boxShadow: `0 0 20px ${color || "#6366f1"}40`
                                }}
                            />

                            {/* Avatar Container */}
                            <div className="relative">
                                {botAvatar ? (
                                    <img
                                        src={botAvatar}
                                        alt={botName || "Bot Avatar"}
                                        className="w-24 h-24 rounded-full border-4 object-cover relative z-10"
                                        style={{ borderColor: color || "#6366f1" }}
                                    />
                                ) : (
                                    <div
                                        className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 relative z-10"
                                        style={{
                                            backgroundColor: color || "#6366f1",
                                            borderColor: color || "#6366f1",
                                        }}
                                    >
                                        {botName?.charAt(0) || "B"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bot Info Hierarchy */}
                    <div className="text-center mb-8">
                        {/* Bot Name */}
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Bot className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {botName || "Unnamed Bot"}
                            </h2>
                        </div>

                        {/* Domain */}
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                            <Globe className="w-4 h-4" />
                            <span className="text-base">{domain || "No domain provided"}</span>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            About This Bot
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            {description || "No description provided yet."}
                        </p>
                    </div>

                    {/* Bot Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Role Card */}
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Bot Role
                            </span>
                            <p className="font-semibold text-gray-900 dark:text-white mt-1">
                                {selectedRole || "Not set"}
                            </p>
                        </div>

                        {/* System Prompt Card */}
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                System Prompt
                            </span>
                            <div className="mt-1">
                                <div
                                    className="max-h-[250px] overflow-y-auto custom-scrollbar"
                                >
                                    <p className="font-semibold text-gray-900 dark:text-white pr-2">
                                        {showFullPrompt ? systemPrompt : (systemPrompt && systemPrompt.length > 80 ? truncateText(systemPrompt, 80) : systemPrompt) || "No system prompt"}
                                    </p>
                                </div>
                                {systemPrompt && systemPrompt.length > 80 && (
                                    <button
                                        onClick={() => setShowFullPrompt(!showFullPrompt)}
                                        className="text-xs cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2 flex items-center gap-1 transition-colors duration-200"
                                    >
                                        {showFullPrompt ? (
                                            <>
                                                <EyeOff className="w-3 h-3" />
                                                Show less
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="w-3 h-3" />
                                                Show more
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer Action Bar */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700/50">
                        <Button
                            variant="outline"
                            className="px-6 py-3 rounded-xl border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            onClick={handleBack}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>

                      {  !isEditing ? <Button
                            className="w-48 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"

                            onClick={handleNext}
                            disabled={isCreatingBot || isLoading}
                        >
                            {isCreatingBot || isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="animate-spin w-5 h-5" />
                                    <span>Creating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Create Chatbot</span>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            )}
                        </Button>
                        :
                        <Button
                            className="w-48 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                            onClick={handleUpdateChatbot}
                            disabled={isUpdatingBot || isLoading}
                        >
                            {isUpdatingBot || isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="animate-spin w-5 h-5" />
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Update Chatbot</span>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            )}
                        </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewBot;
