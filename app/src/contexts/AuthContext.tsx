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
import {
  useLoginWithCookie,
  useSignIn,
  useSignOut,
} from "@/lib/api/api-client";
import { useProject } from "./ProjectContext";
import { User as FirebaseUser } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {
    console.error("AuthContext not initialized properly.");
    return null;
  },
  logout: async () => {
    console.error("AuthContext not initialized properly.");
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { backendHost } = useProject();
  const { data } = useLoginWithCookie(backendHost ?? undefined);
  const { trigger: signInTrigger } = useSignIn(backendHost ?? undefined);
  const { trigger: signOutTrigger } = useSignOut(backendHost ?? undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(false);
      if (data) {
        setUser(data);
      }
    });

    return () => unsubscribe();
  }, [data]);

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
      const userData = await signInTrigger({
        name: firebaseUser.displayName || "Anonymous",
        email: firebaseUser.email || "",
      });
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to log in:", error);
      return null;
    }
  }, [backendHost, firebaseUser, user, signInTrigger]);

  const logout = useCallback(async () => {
    await auth.signOut();
    setUser(null);
    setFirebaseUser(null);
    if (backendHost) {
      try {
        await signOutTrigger();
      } catch (error) {
        console.error("Failed to clear user on backend:", error);
      }
    }
  }, [backendHost, signOutTrigger, setUser, setFirebaseUser]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
