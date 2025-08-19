import { baseApi } from './baseApi';

// Types
export interface BotResponse {
  _id: string;
  botAvatar: string;
  botRole: string;
  createdAt: string; // ISO date string, could also be Date if you want to parse it
  deployUrl: string;
  domain: string;
  language: string;
  memberShip: "free" | "pro" | "enterprise"; 
  memoryEnabled: boolean;
  modelProvider: string;
  modelType: string; 
  name: string;
  systemPrompt: string;
  temperature: number;
  themeColor: string;
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
  botRole: string;
}

export interface UpdateBotData {
  name?: string;
  description?: string;
  domain?: string;
  systemPrompt?: string;
  avatarId?: string;
  themeColor?: string;
  botRole?: string;
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


interface SignUpData {
  username: string;
  email: string;
  password: string;
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

    signUp: builder.mutation<SignUpData, SignUpData>({
      query: (signUpData) => ({
        url: `/auth/register`,
        method: 'POST',
        data: signUpData,
      }),
    }),

    deleteBot: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/chatbots/${id}`,
        method: 'DELETE',
      }),
    }),
    updateBot: builder.mutation<any, { id: string, data: UpdateBotData }>({
      query: ({ id, data }) => ({
        url: `/chatbots/${id}`,
        method: 'PUT',
        data,
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
  useGetUserQuery,
  useSignUpMutation,
  useDeleteBotMutation,
  useUpdateBotMutation
} = botsApi;

