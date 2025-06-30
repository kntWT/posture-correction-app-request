"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ProjectNameForm } from "@/components/forms/projectName";
import { ProjectNameSchema } from "@/lib/schemas/projectName";
import { useProject } from "@/contexts/ProjectContext";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function FormPage() {
  const { user, loading } = useAuth();
  const {
    project,
    setProject,
    setProjectName,
    create,
    loading: isCreating,
  } = useProject();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const onSubmit = async (data: ProjectNameSchema) => {
    setProjectName(data.name);
    if (!user) {
      toast.error("You must be logged in to submit the form.");
      return;
    }
    const projectData = await create(user.token);
    if (!projectData) {
      toast.error("Failed to create project. Please try again.");
      return;
    }
    setProject(projectData);
    toast.success("Form submitted successfully!");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/login"); // 未ログインならログインページへリダイレクト
    return null; // リダイレクト中に何も表示しない
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {project ? (
        <Card className="">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Project Created Successfully
            </CardTitle>
            <CardDescription>
              Your project {project.name} has been created.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <code className="text-center text-lg px-2 py-1 bg-gray-200 rounded">
                {project.appId}
              </code>
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                onClick={async () => {
                  await navigator.clipboard.writeText(project.appId);
                  setCopied(true);
                  toast.success("appIdをクリップボードにコピーしました！");
                  setTimeout(() => setCopied(false), 1500); // 1.5秒後に戻す
                }}
                aria-label="appIdをコピー"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-sm text-red-500 mt-2">
              ※ appIdはこの画面でのみ一度だけ表示されます。必ず控えてください。
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              User Information Form
            </CardTitle>
            <CardDescription>Please fill out your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectNameForm onSubmit={onSubmit} loading={isCreating} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
