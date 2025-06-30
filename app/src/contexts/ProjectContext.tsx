"use client";

import { BackendHost, backendHosts } from "@/configs/backend-host";
import { useCreateProject } from "@/lib/api/api-client";
import { Project, User } from "@/lib/api/schema";
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  useCallback,
} from "react";

type ProjectContextType = {
  project: Project | null;
  setProject: (project: Project | null) => void;
  projectName: string | null;
  setProjectName: (name: string | null) => void;
  appId: string | null;
  setAppId: (id: string | null) => void;
  backendHost: BackendHost | null;
  setBackendHost: (host: BackendHost | null) => void;
  isValid: boolean;
  create: (userToken: User["token"]) => Promise<Project | null>;
  loading: boolean;
};

const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {},
  projectName: null,
  setProjectName: () => {},
  appId: null,
  setAppId: () => {},
  backendHost: null,
  setBackendHost: () => {},
  isValid: false,
  create: async () => {
    console.error("Project context is not initialized properly.");
    return null;
  },
  loading: false,
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [backendHost, setBackendHost] = useState<BackendHost | null>(null);

  const { trigger, isMutating } = useCreateProject(backendHost ?? undefined);

  //   それぞれのstateが有効な値かどうかのバリデーション
  const isValid = useMemo(() => {
    const isValidProjectName =
      projectName !== null && projectName.trim().length > 0;
    const isValidBackendHost =
      backendHost !== null && backendHosts.includes(backendHost);
    return isValidProjectName && isValidBackendHost;
  }, [projectName, backendHost]);

  const create = useCallback(
    async (userToken: User["token"]) => {
      if (!isValid || !userToken || userToken.trim() === "") {
        console.error("Project context is not valid.");
        return null;
      }
      try {
        const data = await trigger({
          name: projectName!,
          ownerUserToken: userToken,
        });
        if (data) {
          setProject(data);
          return data;
        } else {
          console.error("Failed to create project.");
          return null;
        }
      } catch (error) {
        console.error("Error creating project:", error);
        return null;
      }
    },
    [backendHost, trigger, isValid, projectName, setProject]
  );

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projectName,
        setProjectName,
        appId,
        setAppId,
        backendHost,
        setBackendHost,
        isValid,
        create,
        loading: isMutating,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
