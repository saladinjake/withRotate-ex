"use client"
export type User = {
  name: string;
  email: string;
  picture: string;
};
export type AuthContextType = {
  user: User | null;
  isFetchingUserData: boolean;
  accessToken: string | null;
  login: (redirectUri: string) => void;
  logout: () => void;
  handleAuthCallback: (code: string) => Promise<void>;
};