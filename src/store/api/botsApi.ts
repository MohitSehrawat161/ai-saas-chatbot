import { baseApi } from './baseApi';

// Types
export interface BotResponse {
  _id: string;
  name: string;
  description?: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  model?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  deployUrl?: string;
}

export interface CreateBotData {
  name: string;
  domain: string;
  systemPrompt: string;
  modelProvider: string;
  modelType: string;
  temperature: number;
  memoryEnabled: boolean;
  language: string;
  memberShip: string;
  description: string;
  avatarId: string;
  themeColor: string;
}

export interface UpdateBotData {
  name?: string;
  description?: string;
  type?: string;
  status?: 'active' | 'inactive' | 'training';
  model?: string;
}

export interface BotStats {
  totalConversations: number;
  totalMessages: number;
  averageResponseTime: number;
  lastActive: string;
}

export interface AvatarResponse {
  avatars: {
    _id: string;
    avatarUrl: string;
    avatarName: string;
  }[];
}


interface User {
  id: string;
  username: string;
  email: string;
  memberShip: "free" | "pro" | "enterprise"; // can be union type if you know possible values
  role: "user" | "admin"; // extendable if there are more roles
  isChatbot: boolean;
  isKnowledgeBase: boolean;
}



// Bots API slice
export const botsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBots: builder.query<BotResponse[], void>({
      query: () => ({
        url: `/chatbots`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Bot', id: 'LIST' }],
    }),

    createBot: builder.mutation<BotResponse, CreateBotData>({
      query: (botData) => ({
        url: '/chatbots',
        method: 'POST',
        data: botData,
      }),
      invalidatesTags: [{ type: 'Bot', id: 'LIST' }],
    }),

    uploadKnowledgeBase: builder.mutation<BotResponse, FormData>({
      query: (formData) => ({
        url: `/documents/upload`,
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),

    getAvatars: builder.query<AvatarResponse, void>({
      query: () => ({
        url: `/avatar`,
        method: 'GET',
      }),
    }),

    getUser: builder.query<User, void>({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    

  }),
});

// Export hooks
export const {
  useGetBotsQuery,
  useCreateBotMutation,
  useUploadKnowledgeBaseMutation,
  useGetAvatarsQuery,
  useGetUserQuery
} = botsApi;

