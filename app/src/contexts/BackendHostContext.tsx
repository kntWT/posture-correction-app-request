"use client";

import { BackendHost, backendHosts } from "@/configs/backend-host";
import { createContext, useContext, useState } from "react";

type BackendHostWithStatus = BackendHost & {
  available: boolean;
};

export type BackendHostContextType = {
  backendHostsWithStatus: Record<string, BackendHostWithStatus>;
  setBackendHostsWithStatus: (name: string, available: boolean) => void;
};

const BackendHostContext = createContext<BackendHostContextType>({
  backendHostsWithStatus: {},
  setBackendHostsWithStatus: () => {
    console.error("BackendHostContext is not initialized properly.");
  },
});

export const BackendHostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backendHostsWithStatus, setBackendHosts] = useState<
    Record<string, BackendHostWithStatus>
  >(
    Object.fromEntries(
      backendHosts.map((host) => [host.name, { ...host, available: false }])
    )
  );

  const updateBackendHosts = (name: string, available: boolean) => {
    setBackendHosts((prev) => ({
      ...prev,
      [name]: { ...prev[name], available },
    }));
  };

  return (
    <BackendHostContext.Provider
      value={{
        backendHostsWithStatus,
        setBackendHostsWithStatus: updateBackendHosts,
      }}
    >
      {children}
    </BackendHostContext.Provider>
  );
};

export const useBackendHostWithStatus = () => useContext(BackendHostContext);
