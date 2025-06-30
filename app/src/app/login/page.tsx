"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BackendHostForm } from "@/components/forms/backendHost";
import { BackendHostFormSchema } from "@/lib/schemas/backendHost";
import { backendHostNames, backendHosts } from "@/configs/backend-host";
import { useProject } from "@/contexts/ProjectContext";

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const { backendHost, setBackendHost } = useProject();

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // ログイン済みならホームへリダイレクト
    }
    if (!backendHost) {
      router.push("/login");
    }
  }, [user, loading, router, backendHost]);

  const onSubmitBackendHost = (data: BackendHostFormSchema) => {
    if (backendHostNames.includes(data.backendHost)) {
      setBackendHost(
        backendHosts.find((host) => host.name === data.backendHost)!
      );
    } else {
      toast.error("Invalid backend host selected.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await login();
      toast.success(`Hello ${user?.name}! Login successful!`);
    } catch (error: unknown) {
      console.error("Google login failed:", error);
      toast.error(
        `Failed to log in: ${(error as Error)?.message ?? "Unknown error"}`
      );
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <BackendHostForm onSubmit={onSubmitBackendHost} />
          <Button
            onClick={handleGoogleLogin}
            className="w-full"
            disabled={backendHost === null || loading}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
