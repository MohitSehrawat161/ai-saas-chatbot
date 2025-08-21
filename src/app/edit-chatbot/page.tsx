'use client'
import { Send, X } from "lucide-react";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";

import ChatbotSetupStep2 from "@/components/chatbotSteps/ChatbotSetupStep2";
import ChatbotSetupStep1 from "@/components/chatbotSteps/ChatbotSetupStep1";
import { useDispatch, useSelector } from "react-redux";
import ChatbotSetupStep3 from "@/components/chatbotSteps/ChatbotSetupStep3";
import PreviewBot from "@/components/chatbotSteps/PreviewBot";
import ProgressSteps from "@/components/ProgressSteps";
import { resetCustomChatbot, setIsEditing } from "@/store/slices/customChatbotSlice";
import ChatBotPreview from "@/components/ChatBotPreview";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const steps2 = [
    { id: 1, label: "Bot Details" },
    { id: 2, label: "Bot Role" },
    { id: 3, label: "Knowledge Base" },
    { id: 4, label: "Preview" },
];
const EditChatbotPage = () => {

    const [checked, setChecked] = useState(false);
    const { selectedRole, description, botName, botAvatar, steps, color, isEditing } = useSelector((state: any) => state.customChatbot);
    const dispatch = useDispatch();
    const route = useRouter()


    useEffect(() => {
        if (!isEditing) {
            toast.error("Please select a chatbot to edit");
            route.replace("/my-chatbots");
        } else {
            setChecked(true);
        }
    }, []);


    useEffect(() => {
        return () => {
            dispatch(setIsEditing(false));
            dispatch(resetCustomChatbot());
        }
    }, []);
    
    if (!checked) {
        return null; 
    }


    return (
        <>
            <ProgressSteps steps={steps2} currentStep={steps} />
            <div className="grid grid-cols-1 md:grid-cols-[5fr_2fr] 2xl:grid-cols-[10fr_2fr]  mx-auto  gap-6  justify-between gap- items-cente h-full">
                {steps === 1 && <ChatbotSetupStep1 />}
                {steps === 2 && <ChatbotSetupStep2 />}
                {steps === 3 && <ChatbotSetupStep3 />}
                {steps === 4 && <PreviewBot />}
                <ChatBotPreview />
            </div>
        </>
    )
}

export default EditChatbotPage
