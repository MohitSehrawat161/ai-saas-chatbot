import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRole: "Customer Support",
  description: "",
  botName: "John",
  botAvatar: "/avatar2.avif",
  domain: "",
  steps: 1,
  color: "#00043b",
  systemPrompt: "",
  role: "",
  personality: "",
  avatarId: "",
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
  },
});

export const { setSelectedRole, setDescription, setSteps, setBotName, setBotAvatar, setBotColor, setDomain, setSystemPrompt, setAvatarId } = customChatbotSlice.actions;
export default customChatbotSlice.reducer;
