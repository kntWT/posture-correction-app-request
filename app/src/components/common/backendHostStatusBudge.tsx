import { BackendHost } from "@/configs/backend-host";
import { useHealthCheck } from "@/lib/api/api-client";
import { JSX } from "react";

export enum HealthCheckStatusColor {
  SUCCESS = "bg-green-500",
  LOADING = "bg-yellow-400 animate-pulse",
  ERROR = "bg-red-500",
  DEFAULT = "bg-gray-400",
}
const BackendHostStatusBadge = ({
  status,
  size = "4",
}: {
  status: HealthCheckStatusColor;
  size?: string;
}) => {
  const className = () =>
    `aspect-square inline-block rounded-full size-${size} ${status}`;
  return <span className={className()} />;
};

export const useBackendHostStatusBadge = ({
  backendHost,
  size = "4",
}: {
  backendHost: BackendHost;
  size?: string;
}): {
  status: HealthCheckStatusColor;
  badge: JSX.Element;
} => {
  const { data, isLoading } = useHealthCheck(
    `http://${backendHost.host}:${backendHost.port}`
  );
  let status: HealthCheckStatusColor = HealthCheckStatusColor.DEFAULT;
  if (isLoading) {
    status = HealthCheckStatusColor.LOADING;
  } else if (!data) {
    status = HealthCheckStatusColor.ERROR;
  } else if (data) {
    status = HealthCheckStatusColor.SUCCESS;
  }
  return {
    status,
    badge: <BackendHostStatusBadge status={status} size={size} />,
  };
};
