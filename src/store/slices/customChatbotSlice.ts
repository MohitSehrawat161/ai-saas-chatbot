import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRole: "Customer Care Assistant",
  description: "",
  botName: "John",
  botAvatar: "https://agenticuploads.s3.ap-south-1.amazonaws.com/avatarimg/1.jpeg",
  domain: "",
  steps: 1,
  color: "#00043b",
  systemPrompt: "",
  role: "",
  personality: "",
  avatarId: "689dcaabe3cdec2f857f044d",
  isEditing: false,
};

const customChatbotSlice = createSlice({
  name: 'customChatbot',
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBotName: (state, action) => {
      state.botName = action.payload;
    },
    setBotAvatar: (state, action) => {
      state.botAvatar = action.payload;
    },
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setSystemPrompt: (state, action) => {
      state.systemPrompt = action.payload;
    },
    setBotColor: (state, action) => {
      state.color = action.payload;
    },
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setAvatarId: (state, action) => {
      state.avatarId = action.payload;
    },
    resetCustomChatbot: (state) => {
      state.selectedRole = "Customer Care Assistant";
      state.description = "";
      state.botName = "John";
      state.botAvatar = "/avatar2.avif";
      state.domain = "";
      state.steps = 1;
      state.color = "#00043b";
      state.systemPrompt = "";
      state.role = "";
      state.personality = "";
      state.avatarId = "";
      state.isEditing = false;
    },
  },
});

export const {
  setSelectedRole,
  setDescription,
  setSteps,
  setBotName,
  setBotAvatar,
  setBotColor,
  setDomain,
  setSystemPrompt,
  setAvatarId,
  resetCustomChatbot } = customChatbotSlice.actions;
export default customChatbotSlice.reducer;
