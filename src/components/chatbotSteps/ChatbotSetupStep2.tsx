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
  { id: "professional", name: "Professional & Helpful", description: "Formal and business-like" },
  { id: "friendly", name: "Friendly & Casual", description: "Warm and approachable" },
  { id: "technical", name: "Technical & Precise", description: "Detailed and accurate" },
  { id: "custom", name: "Custom", description: "Define your own" },
];
export default function ChatbotSetupStep2() {
  const dispatch = useDispatch();
  const { selectedRole, description, systemPrompt } = useSelector((state: any) => state.customChatbot);
  const [selectedPersonality, setSelectedPersonality] = useState("professional");
  // const [systemPrompt, setSystemPrompt] = useState(promptTemplates[0].content);
  const [selectedTemplate, setSelectedTemplate] = useState("Customer Care Assistant");
  const { data: user } = useGetUserQuery();

  console.log(user);

  const handleTemplateSelect = (template: typeof promptTemplates[0]) => {
    dispatch(setSystemPrompt(template.content));
    setSelectedTemplate(template.name);
    // console.log(template.content)
    // Clear error when user selects a template
  };


  useEffect(() => {
    dispatch(setSelectedRole(promptTemplates[0].name));
    dispatch(setSystemPrompt(promptTemplates[0].content));
  }, []);

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
  }

  return (
    <div className=" mx-auto w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col min-h-[calc(100vh-8rem)]">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Choose Bot Personality:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personalityOptions.map(personality => (
            <label
              key={personality.id}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedPersonality === personality.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <input
                type="radio"
                name="personality"
                value={personality.id}
                checked={selectedPersonality === personality.id}
                onChange={(e) => setSelectedPersonality(e.target.value)}
                className="mr-3"
                disabled={personality.id !== "professional"}
              />
              <div>
                <div className="font-medium text-gray-900">{personality.name}</div>
                <div className="text-sm text-gray-600">{personality.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* System Prompt */}
      <div className="mt-8">
        <div className="flex  items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            System Prompt: <span className="text-red-500">*</span>
          </label>
          <div className="w-56">
            <Select value={selectedTemplate} onValueChange={val => {
              const template = promptTemplates.find(t => t.name === val);
              if (template) handleTemplateSelect(template);
              dispatch(setSelectedRole(val))
              dispatch(setSystemPrompt(template?.content))
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Customer Support" />
              </SelectTrigger>
              <SelectContent>
                {promptTemplates.map(template => (
                  <SelectItem key={template.name} value={template.name} disabled={template.name === selectedTemplate}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <textarea
          value={systemPrompt}
          onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
          placeholder="You are a helpful customer support assistant..."
          rows={8}
          className={`w-full border rounded-md p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2`}
        />

      </div>
      <div className="mt-auto self-end">
        <Button className="mr-2 bg-gray-700 text-white" onClick={() => dispatch(setSteps(1))}>Back</Button>
        <Button onClick={goToNextStep}>Next</Button>
      </div>
    </div>
  );
}
