"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Briefcase,
  Star,
  Calendar,
  Headphones,
  ShoppingBag,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRole, setDescription, setSteps, setSystemPrompt } from "@/store/slices/customChatbotSlice";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { useGetUserQuery } from "@/store/api/botsApi";

const promptTemplates = [
  {
    name: "Customer Care Assistant",
    content: `You are a professional, polite, and empathetic Customer Care Assistant. Your job is to listen carefully, understand customer needs, and provide clear, accurate, and helpful responses. Always maintain a friendly and respectful tone, acknowledge customer concerns, and guide them step by step toward solutions. When needed, escalate issues to the appropriate team or suggest contacting human support. Avoid technical jargon unless the customer asks for it.
Tone: courteous, supportive, and solution-focused.
Focus: answering queries, resolving complaints, providing product/service information, and ensuring a positive customer experience.`
  },
  {
    name: "Medical Assistant",
    content: `You are a compassionate and knowledgeable Medical Assistant specializing in IVF treatments. Your role is to provide accurate, clear, and supportive information about fertility, IVF procedures, medications, lifestyle guidance, emotional support, and next steps in treatment. Always explain complex medical terms in simple, patient-friendly language. You are not a substitute for a doctor and must remind users to consult their fertility specialist for diagnosis or treatment decisions.
Tone: empathetic, reassuring, and professional.
Focus: IVF processes, fertility guidance, medication schedules, FAQs, emotional support resources, and general reproductive health education.`
  }
];

const personalityOptions = [
  { id: "professional", name: "Professional", description: "Formal, business-like, and authoritative", icon: Briefcase, available: true },
  { id: "friendly", name: "Friendly", description: "Warm, approachable, and conversational", icon: MessageSquare, available: false },
  { id: "technical", name: "Technical", description: "Detailed, precise, and informative", icon: Star, available: false },
  { id: "custom", name: "Custom", description: "Define your own unique personality", icon: AlertCircle, available: false },
];

export default function ChatbotSetupStep2() {
  const dispatch = useDispatch();
  const { selectedRole, description, systemPrompt, isEditing } = useSelector((state: any) => state.customChatbot);
  const [selectedPersonality, setSelectedPersonality] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState("Customer Care Assistant");
  const { data: user } = useGetUserQuery();

  const handleTemplateSelect = (template: typeof promptTemplates[0]) => {
    dispatch(setSystemPrompt(template.content));
    setSelectedTemplate(template.name);
  };

  const handlePersonalitySelect = (personalityId: string) => {
    if (personalityOptions.find(p => p.id === personalityId)?.available) {
      setSelectedPersonality(personalityId);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(setSelectedRole(promptTemplates[0].name));
      dispatch(setSystemPrompt(promptTemplates[0].content));
    }
  }, [dispatch]);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'systemPrompt':
        dispatch(setSystemPrompt(value));
        break;
    }
  };

  const goToNextStep = () => {
    if (user?.isKnowledgeBase) {
      dispatch(setSteps(4));
    } else {
      dispatch(setSteps(3));
    }
  };

  return (
    <div className="bg-gradient-to-br rounded-2xl from-[#F9FAFB] to-[#EEF2FF] dark:from-[#111827] dark:to-[#1F2937] max-h-[calc(100vh-200px)] overflow-auto">
      <div className="">

        {/* Main Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Bot Role
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Choose how your bot should interact and behave
            </p>
          </div>

          {/* Personality Selection Cards */}
          {/* <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Select Personality Type:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalityOptions.map(personality => {
                const IconComponent = personality.icon;
                const isSelected = selectedPersonality === personality.id;
                const isAvailable = personality.available;
                
                return (
                  <div
                    key={personality.id}
                    onClick={() => handlePersonalitySelect(personality.id)}
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500/20'
                        : isAvailable
                        ? 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg hover:scale-105'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 cursor-not-allowed opacity-60'
                    }`}
                  >
              
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                 
                    <div className="flex justify-center mb-4">
                      <IconComponent className={`w-8 h-8 ${
                        isSelected ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                    </div>
                    
                 
                    <div className="text-center">
                      <h3 className={`font-semibold text-lg mb-2 ${
                        isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {personality.name}
                      </h3>
                      <p className={`text-sm ${
                        isSelected ? 'text-indigo-700 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {personality.description}
                      </p>
                    </div>
                    
                  
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* System Prompt Section */}
          <div className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                System Prompt Template <span className="text-red-500">*</span>
              </label>

              {/* Template Selection Cards */}
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mb-6">
                {promptTemplates.map(template => {
                  const isSelected = selectedRole === template.name;
                  return (
                    <div
                      key={template.name}
                      onClick={() => {
                        handleTemplateSelect(template);
                        dispatch(setSelectedRole(template.name));
                      }}
                      className={`relative hover:scale-105 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                          ? 'bg-gradient-to-r text-white from-blue-500 to-indigo-600 bg-clip-border shadow-lg'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                    >
                      {/* Selected State Overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-xl" />
                      )}

                      {/* Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="relative z-10">
                        <h3 className={`font-semibold text-base mb-2 ${isSelected ? 'text-white dark:text-blue-100' : 'text-gray-900 dark:text-white'
                          }`}>
                          {template.name}
                        </h3>
                        <p className={`text-xs ${isSelected ? 'text-white dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                          {template.name === "Customer Care Assistant"
                            ? "Professional customer support with empathy and solutions"
                            : "Medical guidance and support for fertility treatments"
                          }
                        </p>
                      </div>

                      {/* Hover Effects */}
                      <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${isSelected
                          ? 'shadow-lg'
                          : 'hover:shadow-md hover:scale-105'
                        }`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Prompt Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Customize System Prompt:
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
                placeholder="You are a helpful customer support assistant..."
                rows={8}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700/50">
            <Button
              onClick={() => dispatch(setSteps(1))}
              variant="ghost"
              className="px-6 py-3 rounded-xl border-gray-200 border text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={goToNextStep}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-5 w-26 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
