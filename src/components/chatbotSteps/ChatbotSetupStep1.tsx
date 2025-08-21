"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Loader, Upload, Check, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBotName, setBotAvatar, setSteps, setBotColor, setDescription, setDomain, setAvatarId, setIsEditing, resetCustomChatbot } from "@/store/slices/customChatbotSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ColorPicker from "../ColorPicker";
import toast from "react-hot-toast";
import { useGetAvatarsQuery, useGetUserQuery } from "@/store/api/botsApi";
import { useRouter } from "next/navigation";

const presetColors = [
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#06B6D4", // Cyan
];

export default function ChatbotSetupStep1() {
  const dispatch = useDispatch();
  const { botName, avatarId, botAvatar, color, description, domain, isEditing } = useSelector((state: any) => state.customChatbot);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<{ description: boolean; domain: boolean }>({ description: false, domain: false });
  const { data: avatars, isLoading } = useGetAvatarsQuery();
  const { data: user } = useGetUserQuery();
  const router = useRouter();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
      dispatch(setBotAvatar(previewURL));
    }
  };
  console.log(avatarId);

  useEffect(() => {
    if (avatars?.avatars?.[0] && !isEditing) {
      dispatch(setBotAvatar(avatars.avatars[0].avatarUrl));
      dispatch(setAvatarId(avatars.avatars[0]._id));
      dispatch(setBotName(avatars.avatars[0].avatarName));
      setSelectedAvatar(avatars.avatars[0]._id);

    }
    if (isEditing) {
      setSelectedAvatar(avatarId);
    }
   
  }, [avatars, dispatch]);

 

  const handleColorChange = (colorValue: string) => {
    dispatch(setBotColor(colorValue));
  };

  const clearValidationErrors = () => {
    setValidationErrors({ description: false, domain: false });
  };

  const gotoNextStep = () => {
    // Clear previous validation errors
    clearValidationErrors();

    let hasErrors = false;
    const newValidationErrors = { description: false, domain: false };

    
    if (!domain?.trim()) {
      newValidationErrors.domain = true;
      hasErrors = true;
    }
    if (!botAvatar) {
      toast.error('Bot avatar is required');
      return;
    }

    if (hasErrors) {
      setValidationErrors(newValidationErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    dispatch(setSteps(2));
  };

  const setAvatar = (avatarId: string, avatarUrl: string, avatarName: string) => {
    dispatch(setAvatarId(avatarId));
    dispatch(setBotAvatar(avatarUrl));
    dispatch(setBotName(avatarName)); // Fix: Set bot name to avatarName, not avatarUrl
    setSelectedAvatar(avatarId);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(e.target.value));
    if (validationErrors.description && e.target.value.trim()) {
      setValidationErrors(prev => ({ ...prev, description: false }));
    }
  };

  const handleDomainChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDomain(e.target.value));
    if (validationErrors.domain && e.target.value.trim()) {
      setValidationErrors(prev => ({ ...prev, domain: false }));
    }
  };


  return (
    <div className="  max-h-[calc(100vh-200px)] overflow-auto rounded-2xl">
      <div className="mx-auto  h-full">
        {/* Left Panel - Form */}
        <div className="bg-white h-full dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-8">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Bot Details
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Give your chatbot a unique identity and personality
            </p>
          </div>



          {/* Bot Description */}
          {/* <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Bot Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe what your chatbot does and how it helps users..."
              rows={3}
              className={`w-full border ${validationErrors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
          </div> */}

          {/* Domain */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Domain <span className="text-red-500">*</span>
            </label>
            <Input
              value={domain}
              onChange={handleDomainChange}
              placeholder="e.g. support.example.com"
              className={`rounded-lg border ${validationErrors.domain ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm`}
            />
          </div>

          {/* Theme Color Picker */}
          <div className="mb-3 flex items-center gap-4">
            <label className="block  text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme Color:
            </label>
            <div className="flex items-center gap-3">
              {/* {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => handleColorChange(presetColor)}
                  className={`w-12 h-12 cursor-pointer rounded-full border-2 transition-all duration-200 hover:scale-110 ${color === presetColor
                      ? 'border-indigo-500 ring-4 ring-indigo-500/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  style={{ backgroundColor: presetColor }}
                >
                  {color === presetColor && (
                    <Check className="w-5 h-5 text-white mx-auto mt-1.5 drop-shadow-sm" />
                  )}
                </button>
              ))} */}

              {/* Custom Color Picker */}
              <div className="text-sm relative font-medium text-gray-700 mb-2 flex items-center gap-2 mt-4">
                <label
                  htmlFor="color"
                  className="w-12 h-12 cursor-pointer rounded-full border-2 transition-all duration-200 hover:scale-110 mb-2"
                  style={{ backgroundColor: color }}
                ></label>

                <input
                  onChange={(e) => handleColorChange(e.target.value)}
                  type="color"
                  id="color"
                  className="w-0 mr-4"
                />
              </div>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Select Avatar <span className="text-red-500">*</span>
            </label>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader className="animate-spin text-indigo-600" size={32} />
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {avatars?.avatars?.map((avatar: any) => (
                  <div key={avatar._id} className="relative flex-shrink-0">
                    <button
                      onClick={() => setAvatar(avatar._id, avatar.avatarUrl, avatar.avatarName)}
                      className={`group cursor-pointer relative w-20 h-20 rounded-full overflow-hidden transition-all duration-200 hover:scale-110 ${selectedAvatar === avatar._id
                        ? 'ring-4 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800'
                        : 'ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-gray-300'
                        }`}
                    >
                      <img
                        src={avatar.avatarUrl}
                        alt={avatar.avatarName}
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Selection Checkmark */}
                      {selectedAvatar === avatar._id && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white bg-indigo-600 rounded-full p-1" />
                        </div>
                      )}
                    </button>

                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2 font-medium">
                      {avatar.avatarName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end">

            <Button
              onClick={gotoNextStep}
              disabled={isLoading}
              className=" bg-gradient-to-r flex items-center justify-center  from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-5 w-26  rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span>Next</span>
              <ChevronRight className=" h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
