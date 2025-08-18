// Base API
export { baseApi } from './baseApi';

// Auth API
export { authApi } from './authApi';
export type {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
  RefreshResponse,
} from './authApi';

// Bots API
export { botsApi } from './botsApi';
export type {
  CreateBotData,
  UpdateBotData,
  BotStats,
} from './botsApi';

// Chat API


// Documents API


// Re-export commonly used hooks
export {
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from './authApi';

export {
  // Bot hooks
  useGetBotsQuery,
  useCreateBotMutation,
 
} from './botsApi';


