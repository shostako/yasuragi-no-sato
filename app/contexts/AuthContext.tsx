"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // authが存在しない場合は最初からローディング完了とする
  const [loading, setLoading] = useState(Boolean(auth));
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      // 管理者権限を確認
      if (user && db) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            setAdminMode(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setAdminMode(false);
        }
      } else {
        setIsAdmin(false);
        setAdminMode(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    if (!db) throw new Error("Firebase Firestore is not initialized");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    // Firestoreにユーザー情報を保存（デフォルトは一般会員）
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName,
      role: "member", // デフォルトは一般会員
      createdAt: new Date().toISOString(),
    });
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase Auth is not initialized");

    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) throw new Error("Firebase Auth is not initialized");

    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error("Firebase Auth is not initialized");

    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, adminMode, setAdminMode, signUp, signIn, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
