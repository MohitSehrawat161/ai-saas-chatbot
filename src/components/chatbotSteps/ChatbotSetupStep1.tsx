"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Loader, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBotName, setBotAvatar, setSteps, setBotColor, setDescription, setDomain, setAvatarId } from "@/store/slices/customChatbotSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ColorPicker from "../ColorPicker";
import toast from "react-hot-toast";
import { useGetAvatarsQuery, useGetUserQuery } from "@/store/api/botsApi";
import { useRouter } from "next/navigation";


export default function ChatbotSetupStep1() {
  const dispatch = useDispatch();
  const { botName, botAvatar, color, description, domain } = useSelector((state: any) => state.customChatbot);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const { data: avatars, isLoading } = useGetAvatarsQuery();
  const { data: user } = useGetUserQuery();
  const router = useRouter();

  console.log(user);
  console.log(avatars?.avatars)
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
      dispatch(setBotAvatar(previewURL));
    }

  };

  useEffect(() => {
    dispatch(setBotAvatar(avatars?.avatars[0]?.avatarUrl));
    dispatch(setAvatarId(avatars?.avatars[0]?._id));
    dispatch(setBotName(avatars?.avatars[0]?.avatarName));
    setSelectedAvatar(avatars?.avatars[0]?._id);
  }, [avatars]);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBotColor(e.target.value));
  }

  const gotoNextStep = () => {
    if (!botName) {
      toast.error('Bot name is required')
      return
    }
    if (!description) {
      toast.error('Bot description is required')
      return
    }
    if (!domain) {
      toast.error('Domain is required')
      return
    }
    if (!botAvatar) {
      toast.error('Bot avatar is required')
      return
    }

    dispatch(setSteps(2));
  }

  const setAvatar = (avatarId: string, avatarUrl: string, avatarName: string) => {
    dispatch(setAvatarId(avatarId));
    dispatch(setBotAvatar(avatarUrl));
    dispatch(setBotName(avatarName));
    setSelectedAvatar(avatarId);
  }

  useEffect(() => {
   if(user?.isChatbot){
    router.push("/my-bots")
   }
  }, []);

  return (
    <div className="max-w-3x w-full mx-auto p-8 bg-white rounded-2xl shadow-lg  border border-gray-100 flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="text-2xl font-bold tracking-tight">Bot Name & Avatar</h2>
      <p className="text-gray-500 mt-2">
        Give your bot a unique identity with a name and an avatar that fits its personality.
      </p>

      {/* Bot Name */}
      {/* <div className="mt-8">
        <label className="block font-medium text-gray-700 mb-2">
          Bot Name <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          value={botName}
          onChange={(e) => dispatch(setBotName(e.target.value))}
          // className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-gray-800"
          placeholder="Enter bot name..."
        />

      </div> */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bot Description: <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          placeholder="Helps customers with common questions and support issues"
          rows={3}
          className={`w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2`}
        />
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Domain: <span className="text-red-500">*</span>
      </label>
      <Input
        value={domain}
        onChange={(e) => dispatch(setDomain(e.target.value))}
        placeholder="e.g. support.example.com"
        className={`w-full`}
      />
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 mt-4">
        Select Theme:

        <label
          htmlFor="color"
          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer overflow-hidden"
          style={{ backgroundColor: color }}
        ></label>

        <input
          onChange={handleColorChange}
          type="color"
          id="color"
          className="w-0 mr-4"
        />
      </div>


      {/* Avatar Upload */}
      <div className="mt-8">
        <label className="block font-medium text-gray-700 mb-4">
          Select any one Avatar
        </label>
        <div className="flex flex-wrap gap-2">

          {
            avatars?.avatars?.map((avatar: any) => (
              <div key={avatar._id} className="relative">
                <img
                  onClick={() => setAvatar(avatar._id, avatar.avatarUrl, avatar.avatarName)} key={avatar._id}
                  className={`${selectedAvatar === avatar._id ? 'border-3 border-blue-800' : ''} w-30 h-30 object-cover object-top rounded-full cursor-pointer overflow-hidden `}
                  src={avatar.avatarUrl} alt="avatar" />
                <p className={`text-sm text-gray-200 mt-2 bottom-2 left-0 w-full text-center bg-black/90 rounded-2xl }`}>{avatar.avatarName}</p>
              </div>
            ))
          }
        </div>
        {isLoading && <Loader className="animate-spin" />}
      </div>
      <div className="mt-auto inline self-end">
        {/* <button></button> */}
        <Button onClick={gotoNextStep}>Next</Button>
      </div>
    </div>
  );
}
