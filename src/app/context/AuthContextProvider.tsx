// context/AuthContext.tsx
"use client";

import React, {  useEffect, useState,createContext, useContext, } from "react";
import { AuthContextType, User} from "./types"
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
   const router = useRouter();
  const pathname = usePathname();
  const publicPaths = ["/auth", "/callback"];
  const [user, setLoginUser] = useState<User | null>(null);
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const [accessToken, setAuthToken] = useState<string | null>(null);
 const checkUserAuthorization = async (token: string) => {
    const verifyResponse = await axios.post<User>(
      `https://api.stg.withrotate.com/api/auth/verify`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return verifyResponse.data;
  };
  useEffect(() => {
    const getUserAuthorizationVerification = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
          setIsFetchingUserData(true);
          setAuthToken(storedAccessToken);
          const userData = await checkUserAuthorization(storedAccessToken);
          setLoginUser(userData);
        } else {
          if (!publicPaths.includes(pathname)) {
            router.push("/auth");
          }
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsFetchingUserData(false);
      }
    };
    getUserAuthorizationVerification();
  }, []);

  const loginAction = async (redirectUri: string) => {
    try {
      const authUrl = `https://api.stg.withrotate.com/api/auth/oauth_authorize?redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAuthCallback = async (code: string) => {
    try {
      setIsFetchingUserData(true);

      const response = await axios.post<{ access_token: string }>(
        `https://api.stg.withrotate.com/api/auth/oauth_token`,
        { code }
      );
      const { access_token } = response.data;

      localStorage.setItem("accessToken", access_token);

      const userData = await checkUserAuthorization(access_token);
      setLoginUser(userData);
      setAuthToken(access_token);
    } catch (error: any) {
      console.error("Error :", error);
    } finally {
      setIsFetchingUserData(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setLoginUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login: loginAction,
        logout,
        handleAuthCallback,
        isFetchingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
