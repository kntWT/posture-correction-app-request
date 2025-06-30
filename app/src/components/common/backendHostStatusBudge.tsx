import { BackendHost } from "@/configs/backend-host";
import { useHealthCheck } from "@/lib/api/api-client";
import { useBackendHostWithStatus } from "../../contexts/BackendHostContext";

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
  const { setBackendHostsWithStatus } = useBackendHostWithStatus();
  const { data, isLoading } = useHealthCheck(
    `http://${backendHost.host}:${backendHost.port}`
  );
  let status: HealthCheckStatusColor = HealthCheckStatusColor.DEFAULT;
  if (isLoading) {
    status = HealthCheckStatusColor.LOADING;
    setBackendHostsWithStatus(backendHost.name, false);
  } else if (!data) {
    status = HealthCheckStatusColor.ERROR;
    setBackendHostsWithStatus(backendHost.name, false);
  } else if (data) {
    status = HealthCheckStatusColor.SUCCESS;
    setBackendHostsWithStatus(backendHost.name, true);
  }

  const className = () =>
    `aspect-square inline-block rounded-full size-${size} ${status}`;
  return <span className={className()} />;
};
