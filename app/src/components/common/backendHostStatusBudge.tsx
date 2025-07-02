import { BackendHost } from "@/configs/backend-host";
import { useBackendHostWithStatus } from "@/contexts/BackendHostContext";
import { useHealthCheck } from "@/lib/api/api-client";
import { useEffect, useState } from "react";

export enum HealthCheckStatusColor {
  SUCCESS = "bg-green-500",
  LOADING = "bg-yellow-400 animate-pulse",
  ERROR = "bg-red-500",
  DEFAULT = "bg-gray-400",
}

export const BackendHostStatusBadge = ({
  backendHost,
  size = 4,
}: {
  backendHost: BackendHost;
  size?: number;
}) => {
  const { backendHostsWithStatus, setBackendHostsWithStatus } =
    useBackendHostWithStatus();
  const { data, isLoading } = useHealthCheck(`${backendHost.baseUrl}`);
  const [status, setStatus] = useState<HealthCheckStatusColor>(
    HealthCheckStatusColor.DEFAULT
  );
  useEffect(() => {
    let available: boolean = false;
    if (isLoading) {
      setStatus(HealthCheckStatusColor.LOADING);
      available = false;
    } else if (!data) {
      setStatus(HealthCheckStatusColor.ERROR);
      available = false;
    } else if (data) {
      setStatus(HealthCheckStatusColor.SUCCESS);
      available = true;
    }
    if (
      backendHost.name &&
      backendHostsWithStatus[backendHost.name].available !== available
    ) {
      setBackendHostsWithStatus(backendHost.name, available);
    }
  }, [
    data,
    isLoading,
    backendHost.name,
    setBackendHostsWithStatus,
    backendHostsWithStatus,
  ]);

  const className = () =>
    `aspect-square inline-block rounded-full size-${size} ${status}`;
  return <span className={className()} />;
};
