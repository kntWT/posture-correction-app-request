import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { backendHostNames, backendHosts } from "@/configs/backend-host";
import {
  BackendHostFormSchema,
  backendHostSchema,
} from "@/lib/schemas/backendHost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  HealthCheckStatusColor,
  useBackendHostStatusBadge,
} from "../common/backendHostStatusBudge";

type Props = {
  onSubmit: (data: BackendHostFormSchema) => void;
  defaultValue?: BackendHostFormSchema["backendHost"];
};

export function BackendHostForm({ onSubmit, defaultValue }: Props) {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<BackendHostFormSchema>({
    resolver: zodResolver(backendHostSchema),
    defaultValues: {
      backendHost: defaultValue || undefined,
    },
  });

  const watchBackendHost = watch("backendHost");
  useEffect(() => {
    if (watchBackendHost) {
      onSubmit({ backendHost: watchBackendHost });
    }
  }, [watchBackendHost, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label htmlFor="backendHost">バックエンドのホスト</Label>
      <Controller
        control={control}
        name="backendHost"
        render={({ field }) => (
          <>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="backendHost"
                className={`${
                  errors.backendHost ? "border-red-500" : ""
                } w-full`}
              >
                <SelectValue placeholder="ホストを選択" />
              </SelectTrigger>
              <SelectContent>
                {backendHosts.map((host) => {
                  const status = useBackendHostStatusBadge({
                    backendHost: host,
                    size: "4",
                  });
                  return (
                    <SelectItem
                      key={host.name}
                      value={host.name}
                      disabled={
                        status.status !== HealthCheckStatusColor.SUCCESS
                      }
                    >
                      <p className="flex gap-2">
                        {host.name}
                        {status.badge}
                      </p>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.backendHost && (
              <p className="text-sm text-red-500">
                {errors.backendHost.message}
              </p>
            )}
          </>
        )}
      ></Controller>
    </form>
  );
}
