"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { User } from "@/lib/api/schema";
import { useSignIn } from "@/lib/api/api-client";
import { useProject } from "./ProjectContext";
import { User as FirebaseUser } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {
    console.error("AuthContext not initialized properly.");
    return null;
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { backendHost } = useProject();
  const { trigger } = useSignIn(backendHost ?? undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (): Promise<User | null> => {
    if (!backendHost) {
      console.error("Backend host is not set.");
      return null;
    }
    if (user) {
      console.log("User already logged in:", user);
      return user;
    }
    if (!firebaseUser) {
      const provider = new GoogleAuthProvider();
      try {
        const data = await signInWithPopup(auth, provider);
        setFirebaseUser(data.user);
      } catch (error) {
        console.error("Google login failed:", error);
        return null;
      }
    }
    if (!firebaseUser) return null;
    try {
      const userData = await trigger({
        name: firebaseUser.displayName || "Anonymous",
        email: firebaseUser.email || "",
      });
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to log in:", error);
      return null;
    }
  }, [backendHost, firebaseUser, trigger, user]);

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
