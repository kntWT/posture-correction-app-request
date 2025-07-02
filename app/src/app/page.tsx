"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function HomePage() {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(`Failed to log out: ${(error as Error).message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-4xl font-bold">Welcome to the App</h1>

      {user ? (
        <div className="mb-4 text-center">
          <p className="text-lg">Welcome, {user.name || user.email}!</p>
          <Button onClick={handleLogout} variant="outline" className="mt-2">
            Logout
          </Button>
        </div>
      ) : (
        <div className="mb-4 text-center">
          <p className="text-lg">You are not logged in.</p>
          <Button asChild className="mt-2">
            <Link href="/login">Go to Login Page</Link>
          </Button>
        </div>
      )}

      <nav className="mt-8">
        <ul className="flex space-x-4">
          <li>
            <Button asChild variant="secondary">
              <Link href="/form">Go to Form Page</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
